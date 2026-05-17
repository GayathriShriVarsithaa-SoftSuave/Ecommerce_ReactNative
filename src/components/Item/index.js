import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import COLORS from '../../constants/COLORS';
const ItemBox=({prod,addtocart})=>{
    const formatdes=(text)=>{
        if(text.length>80){
            return(text.substring(0,80)+"..");
        }
        return(text);
    }
    const des=formatdes(prod.description);
    return(
        <TouchableOpacity style={style.touchbox}>
            <View style={style.box}>
                <Image 
                    source={{uri:prod.thumbnail}}
                    style={{height:150,width:150}}
                />
                <View style={{width:215}}>
                    <Text style={{fontSize:16,fontWeight:"bold",marginBottom:5}}>{prod.title}</Text>
                    <Text style={{marginBottom:5}}>{des}</Text>
                    <Text style={{marginBottom:5,color:COLORS.Orange,fontWeight:"bold"}}>${prod.price}</Text>
                    <TouchableOpacity style={style.btn} onPress={(event)=>{event.stopPropagation(),addtocart(prod)}}>
                        <Text style={{color:COLORS.White}}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default ItemBox;
const style=StyleSheet.create({
    box:{
        flexDirection:"row",
        alignItems:"center"
    },
    touchbox:{
        padding:10,
        marginVertical:10,
        backgroundColor:COLORS.ThumbnailBodyColor,
        width:"95%",
        marginHorizontal:"2.5%",
        borderRadius:25
    },
    btn:{
        backgroundColor:COLORS.Teal,
        width:100,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13
    }
});