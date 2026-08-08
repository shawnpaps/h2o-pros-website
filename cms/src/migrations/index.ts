import * as migration_20260712_172356_initial from './20260712_172356_initial';
import * as migration_20260712_180154_home_hero_cards from './20260712_180154_home_hero_cards';
import * as migration_20260715_173958_cms_text_control from './20260715_173958_cms_text_control';
import * as migration_20260720_140226_cta_band from './20260720_140226_cta_band';
import * as migration_20260721_163847_location_page_headings from './20260721_163847_location_page_headings';
import * as migration_20260731_133000_page_cta_band from './20260731_133000_page_cta_band';
import * as migration_20260808_165306_offer_image from './20260808_165306_offer_image';

export const migrations = [
  {
    up: migration_20260712_172356_initial.up,
    down: migration_20260712_172356_initial.down,
    name: '20260712_172356_initial',
  },
  {
    up: migration_20260712_180154_home_hero_cards.up,
    down: migration_20260712_180154_home_hero_cards.down,
    name: '20260712_180154_home_hero_cards',
  },
  {
    up: migration_20260715_173958_cms_text_control.up,
    down: migration_20260715_173958_cms_text_control.down,
    name: '20260715_173958_cms_text_control',
  },
  {
    up: migration_20260720_140226_cta_band.up,
    down: migration_20260720_140226_cta_band.down,
    name: '20260720_140226_cta_band',
  },
  {
    up: migration_20260721_163847_location_page_headings.up,
    down: migration_20260721_163847_location_page_headings.down,
    name: '20260721_163847_location_page_headings',
  },
  {
    up: migration_20260731_133000_page_cta_band.up,
    down: migration_20260731_133000_page_cta_band.down,
    name: '20260731_133000_page_cta_band',
  },
  {
    up: migration_20260808_165306_offer_image.up,
    down: migration_20260808_165306_offer_image.down,
    name: '20260808_165306_offer_image'
  },
];
