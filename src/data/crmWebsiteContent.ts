import raw from './crm-website-content.json';

export interface CrmPriceItem {
  label: string;
  amount: number;
}

const text = (value: unknown, fallback: string, max: number) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : fallback;
const enabled = (value: unknown) => value === true;
const safePhone = (value: unknown) => {
  const candidate = text(value, '0507-1377-3536', 24);
  return /^[0-9+()\-\s]{7,24}$/.test(candidate) ? candidate : '0507-1377-3536';
};
const safeUrl = (value: unknown, hosts: string[], fallback = '') => {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
      ? url.toString()
      : fallback;
  } catch {
    return fallback;
  }
};

const prices = Array.isArray(raw.prices?.items)
  ? raw.prices.items.flatMap((item): CrmPriceItem[] => {
      if (!item || typeof item !== 'object') return [];
      const row = item as Record<string, unknown>;
      const label = text(row.label, '', 80);
      const amount = Number(row.amount);
      return label && Number.isSafeInteger(amount) && amount > 0 && amount <= 100_000_000
        ? [{ label, amount }]
        : [];
    }).slice(0, 20)
  : [];

export const crmWebsiteContent = {
  revision: text(raw.revision, 'unknown', 96),
  publishedAt: typeof raw.publishedAt === 'string' ? raw.publishedAt : '',
  intro: {
    enabled: enabled(raw.intro?.enabled),
    text: text(raw.intro?.text, '촬영보다 본식이 더 예뻤어요', 500),
  },
  prices: {
    enabled: enabled(raw.prices?.enabled) && prices.length > 0,
    items: prices,
  },
  refund: {
    enabled: enabled(raw.refund?.enabled) && Boolean(raw.refund?.text?.trim()),
    text: text(raw.refund?.text, '', 4_000),
  },
  hours: {
    enabled: enabled(raw.hours?.enabled),
    text: text(raw.hours?.text, '매일 10:00 – 19:00', 160),
  },
  notice: {
    enabled: enabled(raw.notice?.enabled) && Boolean(raw.notice?.text?.trim()),
    text: text(raw.notice?.text, '', 500),
  },
  channels: {
    enabled: enabled(raw.channels?.enabled),
    phone: safePhone(raw.channels?.phone),
    naver: safeUrl(raw.channels?.naver, ['naver.com', 'booking.naver.com']),
    kakao: safeUrl(raw.channels?.kakao, ['kakao.com', 'pf.kakao.com']),
    insta: safeUrl(raw.channels?.insta, ['instagram.com'], 'https://www.instagram.com/ch_weddingmarch/'),
  },
} as const;

export const effectiveWebsiteContent = {
  intro: crmWebsiteContent.intro.enabled ? crmWebsiteContent.intro.text : '촬영보다 본식이 더 예뻤어요',
  hours: crmWebsiteContent.hours.enabled ? crmWebsiteContent.hours.text : '매일 10:00 – 19:00',
  phone: crmWebsiteContent.channels.enabled ? crmWebsiteContent.channels.phone : '0507-1377-3536',
  insta: crmWebsiteContent.channels.enabled ? crmWebsiteContent.channels.insta : 'https://www.instagram.com/ch_weddingmarch/',
};

export const phoneHref = `tel:${effectiveWebsiteContent.phone.replace(/[^0-9+]/g, '')}`;
