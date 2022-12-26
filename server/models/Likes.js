module.exports = (sequelize, DataTypes) => {
 
    const Likes =  sequelize.define("Likes", {

    })

    Likes.associate = (models) => {
        
        Likes.belongsTo(models.Users, {
            as: 'Users', 
            foreignKey: 'UserId',
            onDelete: "cascade"
        })

        Likes.belongsTo(models.Posts, {
            as: 'Posts', 
            foreignKey: 'PostId',
            onDelete: "cascade"
        })
    }

    return Likes
}