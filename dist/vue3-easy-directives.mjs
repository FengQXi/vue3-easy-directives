const i = (t) => t.focus();
function o(t, e, n) {
  const u = new CustomEvent(e, {
    bubbles: !0,
    detail: n
  });
  t.dispatchEvent(u);
}
function c(t, e) {
  let n;
  return t.tagName !== e.toUpperCase() ? n = t.querySelector(e) : n = t, n;
}
const l = {
  mounted(t) {
    let e = c(t, "input");
    const n = function(u) {
      const r = u.target.value.trim();
      u.target.value != r && (u.target.value = r, o(e, "input"));
    };
    t._inputEle = e, t._blurHandler = n, e.addEventListener("blur", n);
  },
  unmounted(t) {
    const { _inputEle: e } = t;
    e.removeEventListener("blur", t._blurHandler);
  }
}, s = {
  focus: i,
  trim: l
}, a = {
  install: (t) => {
    Object.keys(s).forEach((e) => {
      t.directive(e, s[e]);
    });
  }
};
export {
  a as default,
  i as focus,
  l as trim
};
