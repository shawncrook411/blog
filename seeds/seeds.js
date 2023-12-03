const { BlogPost, User, Comment } = require('../models/index')
const sequelize = require('../config/connection.js')


const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    await User.bulkCreate([
        {
            username: 'BeeCaptain78',
            password: '$2b$10$rjuel.qGXi60RSjTQuEUYu5FuwhZGUgKSVMcwYLPWEyWyixLGdJA2'
        },
        {
            username: 'FireBox1829',
            password: '$2b$10$rjuel.qGXi60RSjTQuEUYu5FuwhZGUgKSVMcwYLPWEyWyixLGdJA2'
        },
        {
            username: 'AtlantisIsntReal',
            password: '$2b$10$rjuel.qGXi60RSjTQuEUYu5FuwhZGUgKSVMcwYLPWEyWyixLGdJA2'
        },
        {
            username: 'Juneau7',
            password: '$2b$10$rjuel.qGXi60RSjTQuEUYu5FuwhZGUgKSVMcwYLPWEyWyixLGdJA2'
        }
    ])

    await BlogPost.bulkCreate([
        {
            user_id: '1',
            title: 'Bees are declining!',
            text: 'Oh no! Think of the Bees! What will we do!',
        },
        {
            user_id: '1',
            title: 'Save the bees!',
            text: 'save the bees please, for we need the bees',
        },
        {
            user_id: '2',
            title: 'Matches',
            text: 'I play with matches',
        },
        {
            user_id: '2',
            title: 'Out of matches',
            text: 'I used all of my matches and have no more left',
        },
        {
            user_id: '3',
            title: 'Where?????',
            text: 'If Atlantis is real, where is it? Why havent we found it...? ',
        },
        {
            user_id: '4',
            title: 'Juneau',
            text: 'Juneau is the capitol of Alaska'
        }
    ])

    await Comment.bulkCreate([
        {
            post_id: '1',
            user_id: '3',
            title: 'Sad!',
            text: 'I dont know if theres anything we CAN do...',
        },
        {
            post_id: '6',
            user_id: '1',
            title: 'Alaska?',
            text: 'Does Alaska have bees? Does Juneau?'
        },
        {
            post_id: '1',
            user_id: '2',
            title: 'Did you know?',
            text: 'Bees dont like smoke, sorry',
        },
        {
            post_id: '2',
            user_id: '1',
            title: 'I dont know!',
            text: 'I dont know how to help! I wish I did!',
        },
        {
            post_id: '2',
            user_id: '3',
            title: 'How?',
            text: 'How can I help??',
        },
        {
            post_id: '3',
            user_id: '1',
            title: '???',
            text: 'I dont think its real either?? Unless theyre hiding all the bees..?',
        }
    ])

    process.exit(0)
}

seedDatabase()