const t = (c) => c.focus(), s = {
  focus: t
}, o = {
  install: (c) => {
    Object.keys(s).forEach((e) => {
      c.directive(e, s[e]);
    });
  }
};
export {
  o as default,
  t as focus
};
