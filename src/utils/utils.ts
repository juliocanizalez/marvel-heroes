/* eslint no-restricted-syntax: 0 */
export const NavBarLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png';

export const imagePlaceHolder =
  'https://www.morrispublishing.com/images/comic-book-publishing/features-options/ComicSpread.jpg';

export const getQueryVariable = (variable: string) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (const v of vars) {
    const pair = v.split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return '';
};

export const shortenText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  let sub = text.substr(0, length);
  sub += '...';
  return sub;
};
