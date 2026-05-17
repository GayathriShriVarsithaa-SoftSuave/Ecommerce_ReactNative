import { Modal, Text,View,TouchableOpacity } from "react-native";
import COLORS from "../../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useEffect } from "react";
import Close from "../../assets/Icons/CloseIcon.svg"
const CartModal=({open,close})=>{
    const [items,setItem]=useState([]);
    useEffect(()=>{
        const getItems=async()=>{
            try{
                const data=await AsyncStorage.getItem("cart");
                setItem(data ? JSON.parse(data) : []);
            }
            catch(e){
                console.log(e);
            }
        }
        getItems();
    },[open])
    return(
    <Modal 
    visible={open}
    onRequestClose={close}>
        <View>
            <TouchableOpacity onPress={close}>
                <Close height={20} width={20}/>
            </TouchableOpacity>
        </View>
    </Modal>);
}
export default CartModal;