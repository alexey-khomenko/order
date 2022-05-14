window.openBody = function () {
  const body = document.querySelector('.page-body');

  body.classList.remove('closed');

  const offset = '0';
  body.style.paddingRight = offset;

  return offset;
};

window.closeBody = function () {
  const body = document.querySelector('.page-body');

  const widthInner = +body.offsetWidth;
  body.classList.add('closed');
  const widthOuter = +body.offsetWidth;

  const offset = Math.round(widthOuter - widthInner) + 'px';
  body.style.paddingRight = offset;

  return offset;
};

window.openModal = function (name) {
  const modal = document.querySelector(`.${name}`);
  const backdrop = document.querySelector('.modals');

  modal.classList.add('opened');
  backdrop.classList.add('opened');
  backdrop.style.paddingRight = window.closeBody();
};

window.closeModal = function () {
  const modal = document.querySelector('.modal.opened');
  const backdrop = document.querySelector('.modals');

  modal.classList.remove('opened');
  backdrop.classList.remove('opened');
  backdrop.style.paddingRight = window.openBody();
};

document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.modals').addEventListener('click', function (e) {
    if (e.target.closest('.modal')) return true;

    window.closeModal();
  });

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.card-button');

    if (!btn) return true;

    window.openModal(btn.dataset.target);
  });

  document.addEventListener('submit', async function (e) {
    const form = e.target.closest('.modal-form');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const data = new FormData();

    for (let elem of form.elements) {
      if ('hidden' === elem.type) {
        data.set(elem.name, elem.value);
      }

      if ('radio' === elem.type && true === elem.checked) {
        data.set(elem.name, elem.value);
      }
    }

    const response = await fetch(action, {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('form', results);

    window.closeModal();
  });

});