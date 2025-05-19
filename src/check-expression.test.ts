import { getCheckExpression } from './checker';

describe('Check Expression', () => {
  const expression = new RegExp(getCheckExpression('test.vue'), 'si');
  describe('should detect normal imports', () => {
    it('should be able to detect with vue file suffix', () => {
      expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test.vue' \n")).toBeTruthy();
    });
    it('should be able to detect without vue file suffix', () => {
      expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test' \n")).toBeTruthy();
      expect(expression.test("foo bar\n import MyComponent from '@/components/test' \n")).toBeTruthy();
      expect(expression.test("foo bar\n import MyComponent from '@/test' \n")).toBeTruthy();
    });
    it('should be able to detect @ in filepath', () => {
      expect(expression.test("foo bar\n import MyComponent from '@/components/test.vue' \n")).toBeTruthy();
      expect(expression.test("foo bar\n import MyComponent from '@/test.vue' \n")).toBeTruthy();
    });
    it('should be able to detect ~ in filepath', () => {
      expect(expression.test("foo bar\n import MyComponent from '~/components/test.vue' \n")).toBeTruthy();
      expect(expression.test("foo bar\n import MyComponent from '~/test.vue' \n")).toBeTruthy();
    });
    it('should be able to detect with "', () => {
      expect(expression.test('foo bar\n import MyComponent from "my/file/path/test.vue" \n')).toBeTruthy();
    });
    it('should be able to detect with semicolon', () => {
      expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test.vue'; \n")).toBeTruthy();
      expect(expression.test('foo bar\n import MyComponent from "my/file/path/test.vue"; \n')).toBeTruthy();
      expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test'; \n")).toBeTruthy();
      expect(expression.test('foo bar\n import MyComponent from "my/file/path/test"; \n')).toBeTruthy();
    });
  });
  describe('should detect require calls', () => {
    it('should be able to detect with vue file suffix', () => {
        expect(expression.test("foo bar\n require('my/file/path/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect without vue file suffix', () => {
        expect(expression.test("foo bar\n require('my/file/path/test') \n")).toBeTruthy();
        expect(expression.test("foo bar\n require('@/components/test') \n")).toBeTruthy();
        expect(expression.test("foo bar\n require('@/test') \n")).toBeTruthy();
      });
      it('should be able to detect @ in filepath', () => {
        expect(expression.test("foo bar\n require('@/components/test.vue') \n")).toBeTruthy();
        expect(expression.test("foo bar\n require('@/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect ~ in filepath', () => {
        expect(expression.test("foo bar\n require('~/components/test.vue') \n")).toBeTruthy();
        expect(expression.test("foo bar\n require('~/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect with "', () => {
        expect(expression.test('foo bar\n require("my/file/path/test.vue") \n')).toBeTruthy();
      });
      it('should be able to detect with semicolon', () => {
        expect(expression.test("foo bar\n require('my/file/path/test.vue'); \n")).toBeTruthy();
        expect(expression.test('foo bar\n require("my/file/path/test.vue"); \n')).toBeTruthy();
        expect(expression.test("foo bar\n require('my/file/path/test'); \n")).toBeTruthy();
        expect(expression.test('foo bar\n require("my/file/path/test"); \n')).toBeTruthy();
      });
  });
  describe('should detect import calls', () => {
    it('should be able to detect with vue file suffix', () => {
        expect(expression.test("foo bar\n import('my/file/path/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect without vue file suffix', () => {
        expect(expression.test("foo bar\n import('my/file/path/test') \n")).toBeTruthy();
        expect(expression.test("foo bar\n import('@/components/test') \n")).toBeTruthy();
        expect(expression.test("foo bar\n import('@/test') \n")).toBeTruthy();
      });
      it('should be able to detect @ in filepath', () => {
        expect(expression.test("foo bar\n import('@/components/test.vue') \n")).toBeTruthy();
        expect(expression.test("foo bar\n import('@/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect ~ in filepath', () => {
        expect(expression.test("foo bar\n import('~/components/test.vue') \n")).toBeTruthy();
        expect(expression.test("foo bar\n import('~/test.vue') \n")).toBeTruthy();
      });
      it('should be able to detect with "', () => {
        expect(expression.test('foo bar\n import("my/file/path/test.vue") \n')).toBeTruthy();
      });
      it('should be able to detect with semicolon', () => {
        expect(expression.test("foo bar\n import('my/file/path/test.vue'); \n")).toBeTruthy();
        expect(expression.test('foo bar\n import("my/file/path/test.vue"); \n')).toBeTruthy();
        expect(expression.test("foo bar\n import('my/file/path/test'); \n")).toBeTruthy();
        expect(expression.test('foo bar\n import("my/file/path/test"); \n')).toBeTruthy();
      });
  });

  describe('should detect imports and requires in various formats', () => {
    it('should detect imports split across multiple lines', () => {
      expect(expression.test("import MyComponent\n  from '@/components/test.vue';")).toBeTruthy();
      expect(expression.test("const MyComponent =\n  require('@/components/test.vue');")).toBeTruthy();
    });

    it('should detect imports with varying whitespace around path', () => {
      expect(expression.test("import MyComponent from   '@/components/test.vue' ;")).toBeTruthy();
      expect(expression.test("const MyComponent = require(  '@/components/test.vue');")).toBeTruthy();
    });
  });
});
