export default {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      logout: 'Выйти',
    },
    channels: {
      'channel management': 'Управление каналом',
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
      'add button': '+',
      'channel control': 'Управление каналом',
    },
    messages: {
      messageCounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      ariaLabel: 'Новое сообщение',
      placeholder: 'Ведите собщение...',
    },
    loginPage: {
      chatLogin: 'Вход в чат',
      nickname: 'Ваш ник',
      pass: 'Пароль',
      login: 'Войти',
      'have not account': 'Нет аккаунта?',
      registration: 'Регистрация',
      'Request failed with status code 401': 'Неверные имя пользователя или пароль',
      'network error': 'Ошибка соединения',
    },
    signupPage: {
      errors: {
        required: 'Поле не должно быть пустым',
        'username must be at least 3 characters': 'От 3 до 20 символов',
        'username must be max 20 characters': 'От 3 до 20 символов',
        'min pass characters': 'Не менее 6 символов',
        'required field': 'Обязательное поле',
        oneOf: 'Пароли должны совпадать',
        'user is exists': 'Такой пользователь уже существует',
        'network error': 'Ошибка соединения',
      },
      registration: 'Регистрация',
      name: 'Имя пользователя',
      pass: 'Пароль',
      'confirm pass': 'Подтвердите пароль',
      register: 'Зарегистрироваться',
      'have account': 'Есть аккаунт?',
      chatLogin: 'Вход в чат',
    },
    notFoundPage: {
      'page not found': 'Страница не найдена',
      'link to': 'Перейти на',
      'main page': 'Главную страницу',
    },
    modals: {
      addChannel: {
        errors: {
          required: 'Поле не должно быть пустым',
          min: 'Должно быть не менее 3 символов',
          notOneOf: 'Канал с таким названием уже существует',
        },
        'channel name': 'Имя канала',
        'add channel': 'Добавить канал',
        cancel: 'Отменить',
        add: 'Отправить',
        'channel is added': 'Канал создан',
      },
      removeChannel: {
        'remove channel': 'Удалить канал',
        sure: 'Уверены?',
        cancel: 'Отменить',
        remove: 'Удалить',
        'channel is removed': 'Канал удалён!',
      },
      renameChannel: {
        errors: {
          required: 'Поле не должно быть пустым',
          min: 'Должно быть не менее 3 символов',
          notOneOf: 'Канал с таким названием уже существует',
        },
        'channel name': 'Имя канала',
        rename: 'Переименовать канал',
        cancel: 'Отменить',
        confirm: 'Отправить',
        'channel is renamed': 'Канал переименован',
      },
    },
    loader: {
      loading: 'Загрузка...',
    },
  },
};
