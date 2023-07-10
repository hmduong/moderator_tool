const gamesData = [
    {
        name: 'game 1',
        description: 'abc',
        cards: [{ pos: 0, quantity: 1 }, { pos: 2, quantity: 1 }, { pos: 3, quantity: 1 }, { pos: 1, quantity: 1 }, { pos: 4, quantity: 1 },],
    },
    {
        name: 'game 1',
        description: 'abc',
        cards: [{ pos: 0, quantity: 1 }, { pos: 2, quantity: 1 }, { pos: 3, quantity: 1 }, { pos: 1, quantity: 1 }, { pos: 4, quantity: 1 },],
    },
];

const cardsData = [
    { name: 'Wolf', description: 'abc', firstCall: '<assign>Cho gọi sói/<target>Sói cắn ai:', eachCall: '<target>Sói cắn ai:' },
    { name: 'Seer', description: 'abc', firstCall: '<assign>Cho gọi tiên tri/<target>Tiên tri soi ai:', eachCall: '<target>Tiên tri soi ai:' },
    { name: 'Witch', description: 'abc', firstCall: '<assign>Cho gọi phù Thủy/<agree>Phù thủy cứu?/<target>Phù thủy giết:', eachCall: '<agree>Phù thủy cứu?/<target>Phù thủy giết:' },
    { name: 'Hunter', description: 'abc', firstCall: '<assign>Cho gọi thợ săn/<target>thợ săn kéo theo ai:', eachCall: '<target>thợ săn kéo theo ai:' },
    { name: 'Body Guard', description: 'abc', firstCall: '<assign>Cho gọi bảo vệ/<target>Bảo vệ ai:', eachCall: '<target>Bảo vệ ai:' },
    { name: 'Villager', description: 'abc', firstCall: '<assign>Dân đi ngủ', eachCall: '' },
];

const partiesList = [
    { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' },
    { name: 'Nebraska', code: 'NE' },
    { name: 'California', code: 'CA' },
    { name: 'New York', code: 'NY' },
];

export { gamesData, cardsData, partiesList }