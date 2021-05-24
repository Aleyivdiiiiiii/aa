require("dotenv").config();

const BOT_API       = process.env.BOT_API || '';
const PORT          = process.env.PORT || 3000;
const URL           = process.env.URL || 'https://your-heroku-app.herokuapp.com';

const { Telegraf } = require('telegraf')
const bot       = new Telegraf(BOT_API);

const config = require('./config');

// Bota start verdiğinizde atılan ilk mesaj
bot.start((ctx) => {
    return ctx.reply("Salamm");
});


bot.hears(/Salam/ig, async (ctx, next) => {
    await ctx.telegram.sendPhoto(ctx.chat.id,
        'https://telegra.ph/file/b6d46ca9d253032306c9c.jpg',
        { caption:  `<b>Necəsən? ${ctx.from.first_name} , Mən @SirinCayBoss'un Test Botuyam🤖\nTanışdığımıza Məmnun Oldum🥰</b>`,  parse_mode: 'HTML' })
    return next();
});

bot.hears(/AST/ig, async (ctx, next) => {
    await ctx.telegram.sendPhoto(ctx.chat.id,
        'https://telegra.ph/file/529385f52828c44aaf6bc.jpg',
        { caption:  `<b>Salam ${ctx.from.first_name} Rəsmi Kanalımız @Anti55📣\nKanalda sizə, Premium, Mod, Crack, Pro proqramlar, oyunlar və s. kimi bir çox yararlı informasiyalar təqdim edirik✅\n Hər hansısa çətinliklə bağlı dəstək qrupumuza qoşulun👇🏻\n@texnologiya555 👨🏼‍💻</b>`,  parse_mode: 'HTML' })
    return next();
});

bot.hears(/selam/ig, async (ctx, next) => {
    await ctx.telegram.sendPhoto(ctx.chat.id,
        'https://telegra.ph/file/f257ac88cdf61b278c4db.jpg',
        { caption:  `<b>${ctx.from.first_name}</b>`,  parse_mode: 'HTML' })
    return next();
});

bot.command('salam', async (ctx, next) => {
    
    await bot.telegram.sendDocument(ctx.chat.id, {
        source: './fotolar/salam.jpg'
    }, {
        filename: 'salam.jpg',
        caption: 'Necəsən?'
    })
    return next()
    
})


bot.command('ad', async (ctx, next) => {
    await ctx.telegram.sendMessage(ctx.chat.id, `<b>${ctx.from.first_name}</b>`, { parse_mode: 'HTML' })
    return next();
});


bot.use(
    require('./handlers/middlewares'),
    require('./plugin')
);

// Kodlarda hata çıkarsa bunun sayesinde çalışmaya devam eder.
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun kullanıcı adını alan bir kod.
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Bot Başlatıldı! => ${bot.options.username}`)
})

// Heroku sitesinde botunuzun kullanıcı adı gözükür -> deneyselbot.herokuapp.com
const cb = function(req, res) {
    res.end(`${bot.options.username}`)
}

// Botun webhook ile çalışmasını sağlar.
bot.launch({
    webhook: {
        domain: `${URL}`,
        port: `${PORT}`,
        cb
    }
})

// Bu botumuzu nazikçe durdurmayı etkinleştirir.
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
