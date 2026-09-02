import { existsSync, readdirSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import english from '@/models/en.json';
import spanish from '@/models/es.json';
import data from '@/models/data.json';
import { experiences } from '@/models/experiences';

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return Array.from(new Set(value.map(item => JSON.stringify(shape(item))))).sort();
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, shape(item)]));
  }
  return typeof value;
}

function assetPaths(value: unknown): string[] {
  if (typeof value === 'string') return value.startsWith('/assets/') ? [value] : [];
  if (value && typeof value === 'object') return Object.values(value).flatMap(assetPaths);
  return [];
}

describe('bilingual content', () => {
  it('has identical dictionary keys and value types', () => {
    expect(shape(english)).toEqual(shape(spanish));
  });

  it('has one translation per catalog entry in both languages', () => {
    const ids = experiences.map(entry => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const dictionary of [english, spanish]) {
      expect(Object.keys(dictionary.experience).filter(key => key !== 'section').sort()).toEqual([...ids].sort());
      for (const id of ids) {
        expect(dictionary.experience[id].title.trim()).not.toBe('');
        expect(dictionary.experience[id].list.length).toBeGreaterThan(0);
      }
    }
  });

  it('references real assets with matching filename casing', () => {
    for (const path of assetPaths([data, experiences])) {
      const file = resolve('public', path.slice(1));
      expect(existsSync(file), path).toBe(true);
      expect(readdirSync(dirname(file)), path).toContain(basename(file));
    }
  });

  it('defines positive image dimensions', () => {
    for (const { img } of experiences) {
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  });
});
