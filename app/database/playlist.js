


function getPlaylistsForSale(userId){

  const where = {
    userId: {
      $ne: userId
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
        userId: userId,
      },
      required: false
    }
  ];

  return Playlist.findAll({
    include: includes,
    where: where
  });
}

function getUserPlaylists(userId) {
  Playlist.findAll({
    where: {
      userId: userId,
      status: "none"
    }
  });
}