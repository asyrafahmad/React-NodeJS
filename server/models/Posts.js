module.exports = (sequelize, DataTypes) => {
 
    const Posts =  sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            // as: 'Comments', 
            // foreignKey: 'PostId',
            onDelete: "cascade"
        })

        Posts.hasMany(models.Likes, {
            // as: 'Likes', 
            // foreignKey: 'PostId',
            onDelete: "cascade"
        })

        Posts.belongsTo(models.Users, {
            as: 'Users', 
            foreignKey: 'UserId',
            onDelete: "cascade"
        })
    }

    return Posts
}

// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return queryInterface.createTable('Posts', {
//             title: {
//                 type: Sequelize.DataTypes.STRING,
//                 allowNull: false
//             },
//             postText: {
//                 type: Sequelize.DataTypes.STRING,
//                 allowNull: false
//             },
//             username: {
//                 type: Sequelize.DataTypes.STRING,
//                 allowNull: false
//             },
//           });
//       },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.bulkDelete('Posts', null, {});
//     }
// }