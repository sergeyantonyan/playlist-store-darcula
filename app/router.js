const Router =  require('koa-router');

let router = new Router();

router.get('/', async function(ctx) {
    await ctx.render("main", {});
});

router.get('/home', async function(ctx) {
    await ctx.render("home", {});
});

router.get('/create-playlist', async function(ctx) {
    await ctx.render("create_playlist", {});
});

router.get('/playlist', async function(ctx) {
    await ctx.render("list", {});
});

router.get('/payment', async function(ctx) {
    await ctx.render("payment", {});
});

module.exports = router;
