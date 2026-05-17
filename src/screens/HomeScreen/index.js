import React,{useEffect,useState} from "react";
import {Text,View,TextInput,Button,ScrollView, StyleSheet,TouchableOpacity,Alert} from "react-native";
import Cart from "../../assets/Icons/CartIcon.svg";
import COLORS from "../../constants/COLORS";
import Search from "../../assets/Icons/SearchIcon.svg";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from "../../components/Item"
const HomeScreen=()=>{
    const [product,setProduct]=useState([]);
    const [search, setSearch] = useState("");
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const prod=await axios.get("https://dummyjson.com/products");
                setProduct(prod.data.products);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchData();
    },[]);
     const filteredProducts = product.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
    );
    const addtocart=async(prod)=>{
        try{
            const existingItems=await AsyncStorage.getItem("cart");
            const existingCartItem=existingItems ? JSON.parse(existingItems) : [];
            const alreadyExists=existingCartItem.find((item)=>item.id===prod.id);
            if (alreadyExists){
                Alert.alert("Product already added to cart!");
                return;
            }
            existingCartItem.push(prod);
            await AsyncStorage.setItem("cart",JSON.stringify(existingCartItem));
            Alert.alert("Product added to cart!")
            const updatedCart = await AsyncStorage.getItem("cart");
            console.log("successful", JSON.parse(updatedCart));
           }
        catch(e){
            console.log(e);
        }
    }
    const categories = [...new Set(product.map((item) => item.category))];
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
                    placeholderTextColor="#010000"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <Search height={25} width={25}/>
            </View>
            
            <View style={{paddingHorizontal:10,flexDirection:"row"}}>
                <Text style={{fontWeight:"bold",fontSize:16}}>Filter:</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    >
                    {categories.map((item, index) => (
                        <TouchableOpacity key={index} style={style.filtertab}>
                            <Text style={{color:COLORS.White}}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View>
                {filteredProducts.map((item, index) => (
          <Item key={index} prod={item} addtocart={addtocart}/>
        ))}
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
    },
    filtertab:{
        height:25,
        width:"auto",
        paddingHorizontal:15,
        backgroundColor:COLORS.Teal,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:5,
        borderRadius:12

    }
})