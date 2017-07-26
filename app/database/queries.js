const {User, Playlist, Order, Forsale} = require("./models.js");

module.exports.getUser = async function(uid){
  let users = await User.findOne({
    where: {
      id: uid
    }
  });
  return users;
};
module.exports.getMyPlaylists = async function(uid)
{
  let myPlaylists = await Playlist.findAll({
    where: {
      userId: uid,
      status: "none"
    }
  });
  return myPlaylists;
}
module.exports.findForSale =  async function(uid)
{
  const where = {
    userId: {
      $ne: uid
    },
    status: {
      $ne: "purchased"
    }
  };

  where['$' + Playlist.associations.Order.as + '.userId$'] = null;

  const includes = [
    {
      model: Forsale,
      required: true
    },
    {
      model: Order,
      as: Playlist.associations.Order.as,
      where: {
        userId: uid,
      },
      required: false
    }
  ];
  let forSale = await Playlist.findAll({
    include: includes,
    where: where
  });
  return forSale;
}
module.exports.findOnePlaylist = async function(uid)
{
  let playlist = await Playlist.findOne({
    where: {
      id: ctx.request.query['playlistId']
    }
  });
  return playlist;
};
module.exports.findImported = async function(uid)
{
  let imported = await Playlist.findAll({
    where: {
      userId: uid,
      status: "forSale"
    }
  });
  return imported;
}
