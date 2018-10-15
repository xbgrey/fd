function sleep() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

exports.login = async ctx => {
  const json = ctx.request.body;
  const { username } = json;
  let data;
  let toast = 'success.login';
  let token = '123';

  if (username === 'a@s.com') {
    data = { role: '', side: '' };
    toast = 'fail.account_not_found';
    token = '';
  } else {
    data = {
      username,
      role: '',
      side: '',
    };
  }

  await sleep();
  ctx.body = {
    status: 'ok',
    token,
    toast,
    data,
  };
};

exports.logout = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '',
    toast: 'success.logout',
    role: '',
    side: '',
  };
};

exports.availableRoles = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      roles: [
        { role: 'SCHOOL', available: false, side: 'BUY' },
        { role: 'FACTORY', available: true, side: 'BUY' },
        { role: 'MALL', available: true, side: 'BUY' },
        { role: 'COMMUNITY', available: true, side: 'BUY' },
        { role: 'PHOTOVOLTAIC', available: true, side: 'SELL' },
        { role: 'WIND', available: true, side: 'SELL' },
        { role: 'BATTERY', available: true, side: 'SELL' },
        { role: 'GAS', available: true, side: 'SELL' },
      ],
    },
  };
};

exports.updateRole = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      side: 'SELL',
      role: 'SCHOOL',
    },
  };
};

exports.currentState = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      currentState: {
        power: 10,
        cost: 0.36,
        efficiency: 1,
      },
    },
  };
};

exports.earns = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      earns: {
        vol: 12,
        price: 0.31,
        amount: 12500,
      },
    },
  };
};

exports.offer = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      offer: {
        price: 0.23,
        timestamp: Date.now(),
      },
    },
  };
};

exports.postOffer = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: 'success.offer',
  };
};

exports.quotePrice = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      {
        amount: 5000,
        earning: 3000,
        status: 0,
        time: Date.now(),
      },
      {
        amount: 5000,
        earning: 3000,
        status: 0,
        time: Date.now(),
      },
    ],
  };
};
