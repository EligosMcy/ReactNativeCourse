import { View, Text } from "react-native";

export default function Greet({name})
{
    return (
        <View>
            <Text>你好, {name}</Text>
        </View>
    )
}