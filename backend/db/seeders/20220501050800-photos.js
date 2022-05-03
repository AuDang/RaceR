'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Photos', [
    {
      albumId: 1,
      userId: 1,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383162/widebody-toyota-avalon-race-car-defies-convention-looks-like-a-jdm-special-141149_1_xqv3po.jpg",
      caption: "WideBody Toyota Avalon",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 1,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383161/IMG_3257_2_rivpt4.jpg",
      caption: "Stage 3 WRX",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 1,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383161/SOS_SEMA_Tuners-08-2_cjat7w.jpg",
      caption: "Widebody Carbon Mk5",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 1,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/c2b774_2dcaaee17b3e4477936119453630affd_mv2_d_3498_2074_s_2_y8dwse.jpg",
      caption: "Widebody Mx5",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 1,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/toyota-86-rocket-bunny_qzgwtz.webp",
      caption: "Rocket Bunny GT86",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 2,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/2022-subaru-brz-gets-jdm-gt300-race-car-tuning-in-wild-rendering-152177_1_lrtvxv.jpg",
      caption: "GT300 Widebody BRZ",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 2,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/850_5019_1_bxyt0g.jpg",
      caption: "Mazda RX& RE Amemiya",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 2,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/915266_j99bzz.jpg",
      caption: "Carbon Silvia s14",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 2,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/Datsun-240Z--1024x555_yyos0x.jpg",
      caption: "Datsun 270z",
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      albumId: 1,
      userId: 2,
      photoUrl: "https://res.cloudinary.com/dejdhbcrb/image/upload/v1651383160/114-1148914_photo-wallpaper-mitsubishi-lancer-evolution-mitsubishi-whistler-wheels_ds7mrb.jpg",
      caption: "Stage 3 Evo 9",
      createdAt: new Date (),
      updatedAt: new Date ()
    },

  ],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {})
  }
};
