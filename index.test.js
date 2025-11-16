import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 Sayfanın head bölümüne Türkçe karakterleri destekleyecek karakter seti için meta tag eklenmiş', () => {
    const cssMetaTag = dom.window.document.head.querySelector(
      'meta[charset="UTF-8"]'
    );
    expect(cssMetaTag).toBeInTheDocument();
  });

  it('html-0 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-0 Sayfanın head bölümüne başlık ve 'WORKINTECH ACADEM' eklenmiş.", () => {
    const csstitleTag = dom.window.document.head.querySelector('title');
    expect(csstitleTag).toBeInTheDocument();
    expect(csstitleTag.textContent).toBe('WORKINTECH ACADEMY');
  });

  it('html-1 header bölümü içine h2 ve metni eklenmiş', () => {
    const element = container.querySelector('header h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('WiT');
  });

  it("html-2 header bölümü'ne navigasyon menüsü eklenmiş", () => {
    const element = container.querySelector('header nav');
    expect(element).toBeInTheDocument();
  });

  it("html-2 header bölümü'ün sadece 2 child element'i var: h2 ve nav", () => {
    const element = container.querySelector('header').children;
    expect(element.length).toBe(2);
  });

  it("html-2 navigasyon bölümü'nde 4 adet link eklenmiş", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(4);
  });

  it("html-2 navigasyon bölümü'nde 4 adet link doğru metinler ve sıralama ile eklenmiş", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(4);
    expect(element[0].textContent).toMatch(/Ana Sayfa/i);
    expect(element[1].textContent).toMatch(/Hakkımızda/i);
    expect(element[2].textContent).toMatch(/İletişim/i);
    expect(element[3].textContent).toMatch(/Programlar/i);
  });

  it("html-3 navigasyon bölümü'nde ilk item'ın class'ı active ayarlanmış", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(4);
    expect(element[0].classList.contains('active')).toBe(true);
  });

  it("html-4 class'ı banner-section olan bir bölüm(section) oluşturmuş", () => {
    const element = container.querySelector('section.banner-section');
    expect(element).toBeInTheDocument();
  });

  it("html-5 banner-section içinde banner-content class'ı ile gruplanmış bir div tag'i eklenmiş", () => {
    const element = container.querySelector(
      '.banner-section div.banner-content'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-6 banner-content içinde heading doğru tag ve metin ile eklenmiş', () => {
    const element = container.querySelector('.banner-content h1');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toMatch(/WORKINTECH ACADEMY/i);
  });

  it("html-7 banner-content içinde class'ı btn olan button doüru metin ile eklenmiş", () => {
    const element = container.querySelector('.banner-content button');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Projelerim');
  });

  it("html-8 class'ı projects-section olan bir bölüm oluştulmuş", () => {
    const element = container.querySelector('section.projects-section');
    expect(element).toBeInTheDocument();
  });

  it("html-9 projects-section içinde class'ı projects-item olan 6 tane div eklenmiş", () => {
    const elements = container.querySelectorAll(
      '.projects-section .projects-item'
    );
    const children = container.querySelector('.projects-section').children;
    expect(elements.length).toBe(6);
    expect(children.length).toBe(6);
  });

  it("html-10 projects-item olan herbir div'in içinde img oluşturulmuş", () => {
    const elements = container.querySelectorAll(
      '.projects-item > img:first-child'
    );
    expect(elements.length).toBe(6);
  });

  it("html-10 projects-item olan herbir div'in içinde h3 ve metni oluşturulmuş", () => {
    const elements = container.querySelectorAll(
      '.projects-item > h3:last-child'
    );
    expect(elements.length).toBe(6);
    expect(elements[0].textContent).toMatch(/Proje 1/i);
    expect(elements[1].textContent).toMatch(/Proje 2/i);
    expect(elements[2].textContent).toMatch(/Proje 3/i);
    expect(elements[3].textContent).toMatch(/Proje 4/i);
    expect(elements[4].textContent).toMatch(/Proje 5/i);
    expect(elements[5].textContent).toMatch(/Proje 6/i);
  });

  it('html-11 Footer bölümü eklenmiş', () => {
    const element = container.querySelector('footer');
    expect(element).toBeInTheDocument();
  });

  it("html-12 Footer'da class'ı btn olan button eklenmiş", () => {
    const element = container.querySelector('footer button');
    expect(element).toBeInTheDocument();
    expect(element.classList.contains('btn')).toBe(true);
  });

  it('css-1 sayfa kenarındaki boşluklar margin ve padding sıfırlanmış ve min-width ayarlanmış', () => {
    expect(isPropertySetInCss(css, 'body', 'margin', '0')).toBe(true);
    expect(isPropertySetInCss(css, 'body', 'padding', '0')).toBe(true);
    expect(isPropertySetInCss(css, 'body', 'min-width', '750px')).toBe(true);
  });

  it("css-2 active class'ı için istenen 2 kural da ayarlanmış.", () => {
    expect(isPropertySetInCss(css, '.active', 'background', 'black')).toBe(
      true
    );
    expect(isPropertySetInCss(css, '.active', 'color', 'white')).toBe(true);
  });

  it("css-3 header içindeki 2 item'ın aralıkları eşit olacak şekilde sağa-sola yaslanmış", () => {
    expect(isPropertySetInCss(css, 'header', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, 'header', 'justify-content', 'space-between')
    ).toBe(true);
  });

  it("css-4 h2'nin metni sola yaslanmış", () => {
    expect(isPropertySetInCss(css, 'h2', 'text-align', 'left')).toBe(true);
  });

  it("css-5 headerdaki navigasyon bölümü için flex kullanılmış ve flex-item'ların dikeyde ortalanmış", () => {
    expect(isPropertySetInCss(css, 'nav', 'display', 'flex')).toBe(true);
    expect(isPropertySetInCss(css, 'nav', 'align-items', 'center')).toBe(true);
  });

  it("css-6 .banner-section içindeki item'ların yatay ve dikey'de ortalı olması sağlanmış", () => {
    expect(isPropertySetInCss(css, '.banner-section', 'display', 'flex')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, '.banner-section', 'justify-content', 'center')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.banner-section', 'align-items', 'center')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.banner-section', 'align-content', 'center')
    ).toBe(true);
  });

  it("css-7 .banner-section'ın genişliği ekranın %80'i ve en/boy oranı 4/3 olsun", () => {
    expect(
      isPropertySetInCss(css, '.banner-section', 'aspect-ratio', '4/3')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.banner-section', 'width', '80%')).toBe(
      true
    );
  });

  it("css-8 banner-section'ı yukarıdan ve aşağıdan dışta %5'lik boşluk bırakılmış ve yatayda ortalı olmasını sağlanmış", () => {
    expect(
      isPropertySetInCss(css, '.banner-section', 'margin', '5% auto')
    ).toBe(true);
  });

  it("css-9 banner-section'ın arka plan rengi gray yapılmış", () => {
    expect(
      isPropertySetInCss(css, '.banner-section', 'background', 'gray')
    ).toBe(true);
  });

  it("css-10 projects-section class'ında istenen 5 kural da ayarlanmış", () => {
    expect(
      isPropertySetInCss(css, '.projects-section', 'display', 'flex')
    ).toBe(true);
    expect(
      isPropertySetInCss(
        css,
        '.projects-section',
        'justify-content',
        'space-between'
      )
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.projects-section', 'flex-wrap', 'wrap')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.projects-section', 'row-gap', '30px')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.projects-section', 'text-align', 'center')
    ).toBe(true);
  });

  it("css-11 projects-item class'ının genişkiği %30 ayarlanmış", () => {
    expect(isPropertySetInCss(css, '.projects-item', 'width', '30%')).toBe(
      true
    );
  });

  it("css-12 projects-item class'ındaki resimlerin kuralları ayarlanmış", () => {
    expect(
      isPropertySetInCss(css, '.projects-itemimg', 'width', '100%')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.projects-itemimg', 'aspect-ratio', '1/1')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.projects-itemimg', 'background', 'gray')
    ).toBe(true);
  });

  it("css-13 footer'daki buton blok yapılmış", () => {
    expect(isPropertySetInCss(css, 'footerbutton', 'display', 'block')).toBe(
      true
    );
  });
});
