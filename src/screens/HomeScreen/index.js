import React,{useEffect,useState} from "react";
import {Text,View,TextInput,Button,ScrollView, StyleSheet,TouchableOpacity} from "react-native";
import Cart from "../../assets/Icons/CartIcon.svg";
import COLORS from "../../constants/COLORS";
import Search from "../../assets/Icons/SearchIcon.svg";
import axios from 'axios';
import Item from "../../components/Item"
const HomeScreen=()=>{
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const prod=await axios.get("https://dummyjson.com/products");
                console.log("product values",prod.data.products);
                setProduct(prod.data.products);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchData();
    },[]);
    return(
        <ScrollView style={{height:"100%",backgroundColor:COLORS.BackgroundColor}}>

            <View style={style.header}>

                <TouchableOpacity style={style.btn}>
                    <Text style={{color:COLORS.White}}>ADD</Text>
                </TouchableOpacity>

                <Text style={{fontSize:20,fontWeight:"bold"}}>PRODUCTS</Text>

                <View>
                    <Cart width={35} height={35}/>
                </View>
            </View>

            <View style={style.searchbar}>
                <TextInput 
                    placeholder="Search Products.."
                />
                <Search height={25} width={25}/>
            </View>
            
            {/* <View>
                <Text>filter tabs based on category</Text>
            </View> */}

            <View>
                {
                    product.map((item)=>(
                        <Item prod={item}/>
                    ))
                }
            </View>
        </ScrollView>
    )
}
export default HomeScreen;
const style=StyleSheet.create({
    header:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:2,
        padding:10
    },
    btn:{
        height:35,
        width:70,
        backgroundColor:COLORS.Teal,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:17
    },
    searchbar:{
        height:40,
        width:"90%",
        backgroundColor:COLORS.ThumbnailBodyColor,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:10,
        marginHorizontal:"5%",
        marginVertical:10,
        borderRadius:20
    }
})