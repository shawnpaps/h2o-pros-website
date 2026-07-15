import * as migration_20260712_172356_initial from './20260712_172356_initial';
import * as migration_20260712_180154_home_hero_cards from './20260712_180154_home_hero_cards';
import * as migration_20260715_173958_cms_text_control from './20260715_173958_cms_text_control';

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
    name: '20260715_173958_cms_text_control'
  },
];
