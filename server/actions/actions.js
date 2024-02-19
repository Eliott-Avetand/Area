const db = require("../models/db");
const axios = require('axios');
const nodemailer = require('nodemailer');

const data = {
    youtubeLike: {
        index: 0,
        count: 0
    },
    youtubeSub: {
        index: 0,
        count: 0
    },
    mail: {
        index: 0,
        count: 0
    },
    formResponse: {
        index: 0,
        count: 0
    },
    twitchFollowers: {
        index: 0,
        count: 0
    },
    isLive: false,
    githubFollowers: {
        index: 0,
        count: 0
    },
    tweetPin: {
        index: 0,
        id: ''
    },
    twitterSubs: {
        index: 0,
        count: 0
    }
}

const isNewTwitterSub = (user, params, reactionId) => {
    // axios.get(`https://api.twitter.com/2/users/${params}/followers`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAADlShwEAAAAAA6cdgcdTFZM56mEUzyFHi6W0gF4%3DohZ2KjxFAfN8QauZjT9jCu8HvVL0oIh99mBRNOyW6SVZADW5Tb`,
    //     }
    // }).then(res => {
    //     if (data.twitterSubs.index == 0)
    //         data.twitterSubs.count = res.data.meta.result_count;
    //     else if (res.data.meta.result_count > data.twitterSubs.count) {
    //         area[reactionId](user, "New Follows", "A twitter users got a new follow!");
    //     }
    //     data.twitterSubs.count = res.data.meta.result_count;
    //     data.twitterSubs.index += 1;
    // })
}

const isNewTweet = (user, params, reactionId) => {
    // axios.get(`https://api.twitter.com/2/users?ids=${params}&expansions=pinned_tweet_id&tweet.fields=created_at`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAADlShwEAAAAAA6cdgcdTFZM56mEUzyFHi6W0gF4%3DohZ2KjxFAfN8QauZjT9jCu8HvVL0oIh99mBRNOyW6SVZADW5Tb`,
    //     }
    // }).then(res => {
    //     if (data.tweetPin.index == 0)
    //         data.tweetPin.id = res.data.includes.tweets[0].id;
    //     else if (res.data.includes.tweets[0].id != data.tweetPin.id) {
    //         area[reactionId](user, "New pinned tweet", "The account pinned a new tweet");
    //     }
    //     data.tweetPin.id = res.data.includes.tweets[0].id;
    //     data.tweetPin.index += 1;
    // })
}

const isNewLike = (user, params, reactionId) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`
        }
    }).then(res => {
        if (data.youtubeLike.index == 0)
            data.youtubeLike.count = res.data.items[0].statistics.likeCount;
        else if (res.data.items[0].statistics.likeCount > data.youtubeLike.count) {
            area[reactionId](user, "New like", "One of your video got liked!");
        }
        data.youtubeLike.count = res.data.items[0].statistics.likeCount
        data.youtubeLike.index += 1;
    }).catch(err => {
        console.log(err);
    });
}

const isNewYoutubeSub = (user, params, reactionId) => {
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`
        }
    }).then(res => {
        if (data.youtubeSub.index == 0)
            data.youtubeSub.count = res.data.items[0].statistics.subscriberCount;
        else if (res.data.items[0].statistics.subscriberCount > data.youtubeSub.count) {
            area[reactionId](user, "New Sub", "One of your channel got a new sub!");
        }
        data.youtubeSub.count = res.data.items[0].statistics.subscriberCount
        data.youtubeSub.index += 1
    }).catch(err => {
        console.log(err);
    });
}

const isNewResponse = (user, params, reactionId) => {
    axios.get(`https://forms.googleapis.com/v1/forms/${params}/responses`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`
        }
    }).then(res => {
        if (data.formResponse.index == 0)
            data.formResponse.count = res.data.responses.length;
        else if (res.data.responses.length > data.formResponse.count) {
            area[reactionId](user, "New Response", "A form has gotten a new response!");
        }
        data.formResponse.count = res.data.responses.length
        data.formResponse.index += 1
    }).catch(err => {
        console.log(err.response.data);
    });
}

const isNewGithubFollower = (user, params, reactionId) => {
    axios.get(`https://api.github.com/users/${params}`, {
        headers: {
            'Authorization': `Bearer ${user.github.token}`,
        }
    }).then(res => {
        if (data.githubFollowers.index == 0)
            data.githubFollowers.count = res.data.followers;
        else if (res.data.followers > data.githubFollowers.count) {
            area[reactionId](user, "New Follow", "Your github account got a new follow!");
        }
        data.githubFollowers.count = res.data.followers
        data.githubFollowers.index += 1
    }).catch(err => {
        console.log(err);
    });
}

const isLive = (user, params, reactionId) => {
    axios.get(`https://api.twitch.tv/helix/streams?user_login=${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.twitch.token}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    }).then(res => {
        if (res.data.data.length > 0 && !data.isLive) {
            data.isLive = true;
            area[reactionId](user, "I'm in live!", "I've just started a live!");
        }
    }).catch(err => {
        console.log(err);
    });
}

const isNewFollow = (user, params, reactionId) => {
    axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.twitch.token}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    }).then(res => {
        if (data.twitchFollowers.index = 0)
            data.twitchFollowers.count = res.data.total;
        else if (res.data.total > data.twitchFollowers.count) {
            area[reactionId](user, "New Follows", "Your twitch channel got a new follow!");
        }
        data.twitchFollowers.count = res.data.total;
        data.twitchFollowers.index += 1;
    }).catch(err => {
        console.log(err);
    });
}

const isNewMail = (user, params, reactionId) => {
    axios.get(`https://gmail.googleapis.com/gmail/v1/users/${user.email}/messages?labelIds=INBOX&labelIds=UNREAD`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`
        }
    }).then(res => {
        if (data.mail.index = 0)
            data.mail.count = res.data.resultSizeEstimate;
        else if (res.data.resultSizeEstimate > data.mail.count) {
            if (reactionId != 12)
                area[reactionId](user, "New Mail", "YOu got a new mail!");
        }
        data.mail.count = res.data.resultSizeEstimate;
        data.mail.index += 1;
    }).catch(err => {
        console.log(err.response.data);
    });
}

const sendMail = (user, subject, text) => {
    try {
        const transport = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: user.email,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                accessToken: user.google.token,
                refreshToken: user.google.refreshToken
            }
        }
        const transporter = nodemailer.createTransport(transport)
        transporter.sendMail({
            from: user.email,
            to: user.email,
            subject: subject,
            text: text
        });
    } catch (err) {
        console.log(err);
    }
}

const createDoc = (user, subject, text) => {
    axios.post(`https://docs.googleapis.com/v1/documents?title=${subject + ': ' + text}`, {
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`,
        }
    });
}

const calendarEvent = (user, subject, text) => {
    console.log('create event');
    axios.post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        summary: subject + ' ' + text,
        start: {
            dateTime: new Date()
        },
        end: {
            dateTime: new Date()
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.google.token}`,
        }
    });
}

const area = {
    1: isNewTwitterSub,
    2: isNewTweet,
    3: isNewMail,
    4: isNewLike,
    5: isNewYoutubeSub,
    6: isNewResponse,
    7: isNewGithubFollower,
    8: isLive,
    9: isNewFollow,
    10: sendMail,
    11: createDoc,
    12: calendarEvent,
}

setInterval(() => {
    db.query("SELECT * FROM actions", (err, res) => {
        res.forEach(action => {
            db.query(`SELECT * FROM users WHERE id = ${action.userId}`, (errUser, resUser) => {
                if (errUser) throw errUser;
                area[action.actionId](resUser[0], action.data, action.reactionId);
            });
        });
        if (err) throw err;
    });
}, 5000);