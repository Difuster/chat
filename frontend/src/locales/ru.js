export default {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      logout: 'Выход'
    },
    channels: {
      'channel management': 'Управление каналом',
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать'
    },
    messages: {
      messageCounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений'
      },
      ariaLabel: 'Новое сообщение',
      placeholder: 'Ведите собщение...'
    },
    loginPage: {
      chatLogin: 'Вход в чат',
      nickname: 'Ваш ник',
      pass: 'Пароль',
      login: 'Войти',
      'have not account': 'Нет аккаунта?',
      registration: 'Регистрация',
      'Request failed with status code 401': 'Неверные имя пользователя или пароль',
      'network error': 'Ошибка подключения'
    },
    signupPage: {
      errors: {
        required: 'Поле не должно быть пустым',
        'min name characters': 'Имя должно быть не менее 3 символов',
        'min pass characters': 'Пароль должен быть не менее 6 символов',
        oneOf: 'Поле должно совпадать с полем: Пароль'
      },
      registration: 'Регистрация',
      name: 'Имя',
      pass: 'Пароль',
      'confirm pass': 'Подтвердите пароль',
      register: 'Зарегистрироваться',
      'network error': 'Ошибка подключения'
    },
    notFoundPage: {
      'page not found': 'Страница не найдена',
      'link to': 'Перейти на',
      'main page': 'Главную страницу'
    },
    modals: {
      addChannel: {
        errors: {
          required: 'Поле не должно быть пустым',
          min: 'Должно быть не менее 3 символов',
          notOneOf: 'Канал с таким названием уже существует'
        },
        'add channel': 'Добавить канал',
        cancel: 'Отменить',
        add: 'Отправить',
        'channel is added': 'Канал создан'
      },
      removeChannel: {
        'remove channel': 'Удалить канал',
        sure: 'Уверены?',
        cancel: 'Отменить',
        remove: 'Удалить',
        'channel is removed': 'Канал удален!'
      },
      renameChannel: {
        errors: {
          required: 'Поле не должно быть пустым',
          min: 'Должно быть не менее 3 символов',
          notOneOf: 'Канал с таким названием уже существует'
        },
        rename: 'Переименовать канал',
        cancel: 'Отменить',
        confirm: 'Отправить',
        'channel is renamed': 'Канал переименован'
      }
    }
  }
};
