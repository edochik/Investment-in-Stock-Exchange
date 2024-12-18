# MOEX Manager

**MOEX Manager** — это приложение, которое помогает создать и управлять вашим инвестиционным портфелем.
**Пример** - Вы задаёте цель, например, достичь стоимости портфеля в **100 000 рублей**, а приложение автоматически рассчитывает, сколько акций каждой компании нужно купить, чтобы сбалансировать ваш портфель.

*MOEX Manager* - позволяет добавить компании вне индекса IMOEX. Вы можете следить за текущей стоимостью портфеля, изменять вес каждой компании и быстро принимать решения на основе точных данных.

## Используемые технологии

**HTML, CSS, TypeScript, React, Redux/toolkit**

## Источник данных

Проект использует два источника данных:

1. **IMOEX** — компании из индекса IMOEX:
   [Ссылка на источник](https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100)
2. **securities** — все компании, торгующиеся на Московской бирже:
   [Ссылка на источник](https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json)


## Как использовать проект

### Header

В **Header** содержатся:

- Поле для ввода **цели** — суммы, которую пользователь планирует вложить в акции.
- **Корзина** — для сохранения выбранных акций в собственный портфель.

После ввода суммы в поле цели в таблице будет произведен расчет, показывающий, сколько акций каждой компании необходимо купить. Пользователь может откладывать компании из таблицы в корзину, формируя свой портфель.

### Main (Таблица с акциями)

В основном контенте (раздел **Main**) находится таблица со следующими колонками:

- **Тикер**: четырех- или пятизначное обозначение компании.
- **Название компании**: сокращенное или полное наименование.
- **Вес компании**: вес для акций IMOEX загружается из источника (IMOEX), а для остальных компаний указывается пользователем.
- **Цена**: цена акции, загружаемая из источника (securities).
- **Куплено акций (шт)**: редактируемое поле, в котором пользователь может указать количество уже купленных акций.
- **Сумма купленных акций**: результат вычисления как `Цена * Куплено акций (шт)`.
- **Коэффициент**: значение по умолчанию — 1, но его можно изменить вручную.
- **Вес акций в портфеле**: вычисляется как `Вес компании * Коэффициент * Сумма весов всех компаний`.
- **Купить акций (шт)**: рассчитанное количество акций для покупки по заданной цели пользователя, учитывающее лотность.
- **Итого за акцию**: итоговая стоимость акции, вычисляемая как `Цена * Купить акций (шт)`.
- **Убрать**: возможность удалить акцию из таблицы и отправить её в корзину.

### Footer

В **Footer** содержатся поля для добавления компаний, которые не входят в IMOEX:

1. **Первое поле** — для ввода тикера или названия компании, чтобы выбрать её из списка.
2. **Второе поле** — для указания веса компании по усмотрению пользователя.
3. **Кнопка "Добавить"** — после нажатия выбранная компания добавляется в таблицу для дальнейших расчетов и управления.

Таким образом, интерфейс проекта предоставляет пользователю гибкость в управлении портфелем, а таблица автоматически обновляется на основе введенных данных и изменений.

## Сведения об авторах

- **Торопов Егор** — разработчик.
  - GitHub: [github.com/edochik](https://github.com/edochik)

## Лицензия

Этот проект лицензирован под [GNU General Public License (GPL) версии 3.0](https://www.gnu.org/licenses/gpl-3.0.html). Вы можете использовать, изменять и распространять его, при условии, что вы также предоставите доступ к исходному коду и будете придерживаться условий этой лицензии.

## Тесты

Чтобы запустить тесты в этом проекте, выполните следующие шаги:

- Установите зависимости: `npm install`
- Запустите тесты: `npm test`
- Для получения отчета о покрытии тестами используйте команду: `npm test -- --coverage`

### Покрытие тестами

- **Компоненты**: Тесты охватывают отображение интерфейсов и корректное состояние компонентов, проверяют пользовательские взаимодействия (например, клики и ввод данных), а также проверяют правильность отображаемой информации.
- **Функции**: Тесты на уровне функций проверяют бизнес-логику, включая расчеты, обработку данных и их корректность в различных сценариях.
- **Интеграционные тесты**: Проверяют взаимодействие между компонентами и модулями, чтобы убедиться, что все части системы работают согласованно.



