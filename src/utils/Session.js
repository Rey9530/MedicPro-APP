import AsyncStorage from '@react-native-async-storage/async-storage';

const removeSession = async (name) => {
    try {
        await AsyncStorage.removeItem(name);
    }catch(error){
        console.log(error);
    }
}
const setSession = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, value); // JSON.stringify(token));
    } catch (error) {
        console.log("Error from store",error)
    }
};

const getSession = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
            return value;
        }else{
            return 0;
        }
    } catch (error) {
        console.log("ERROR GUARDAR TOKEN",error);
        return null;
    }
}; 

export { getSession, removeSession, setSession };