/**
 * Created by Thibaut on 16/06/2017.
 */

module.exports = {
    
    deleteUserServer : function(player_id, datas)
    {
        for(var i = datas.length-1; i > -1; i--)
        {
            if(datas[i]._id == player_id)
            {
                datas.splice(i);
                break;
            }
        }
    }

}