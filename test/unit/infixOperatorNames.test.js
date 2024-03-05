suite('infixOperatorNames', function () {
  const $ = window.test_only_jquery;
  var mq;
  setup(function () {
    const autoOperatorNames = 'arcsinh sin with for';
    const infixOperatorNames = 'with for';
    const opts = { autoOperatorNames, infixOperatorNames };
    mq = MQ.MathField($('<span></span>').appendTo('#mock')[0], opts);
  });

  function prayWellFormedPoint(pt) {
    prayWellFormed(pt.parent, pt[L], pt[R]);
  }
  function assertLatex(latex) {
    prayWellFormedPoint(mq.__controller.cursor);
    assert.equal(mq.latex(), latex);
  }

  test('for stops scanning', function () {
    mq.typedText('tfor1/');
    assertLatex('t\\operatorname{for}\\frac{1}{ }');
  });

  test('sin does not stop scanning', function () {
    mq.typedText('tsin1/');
    assertLatex('\\frac{t\\sin1}{ }');
  });

  test('arcsinh does not stop scanning', function () {
    mq.typedText('tarcsinh1/');
    assertLatex('\\frac{t\\operatorname{arcsinh}1}{ }');
  });

  test('backspace invalidates word', function () {
    mq.typedText('tfor1');
    mq.keystroke('Home').keystroke('Right').keystroke('Del');
    assertLatex('tor1');
    mq.keystroke('End').typedText('/');
    assertLatex('\\frac{tor1}{ }');
  });
});
