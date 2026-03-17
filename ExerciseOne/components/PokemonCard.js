import { StyleSheet, View, Text, Image, Platform } from 'react-native';

const getTypeDetails = (type) => {
    switch (type.toLowerCase()) {
        case "electric":
            return { borderColor: "#FFD700", emoji: "⚡️" };
        case "water":
            return { borderColor: "#6493EA", emoji: "💧" };
        case "fire":
            return { borderColor: "#FF5733", emoji: "🔥" };
        case "grass":
            return { borderColor: "#66CC66", emoji: "🌿" };
        default:
            return { borderColor: "#A0A0A0", emoji: "❓" };
    }
};

export default function PokemonCard({ name, image, type, hp, moves, weaknesses }) {

    const { borderColor, emoji } = getTypeDetails(type);

    return (
        <View style={[styles.card, { borderColor }]}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.hp}>♥{hp}</Text>
            </View>

            <Image
                source={image}
                style={styles.image}
                accessibilityLabelledBy={`${name} pokemon`}
                resizeMode="contain"
            />

            <View style={styles.typeContainer}>
                <View style={[styles.badge, { borderColor }]}>
                    <Text style={styles.typeEmoji}>{emoji}</Text>
                    <Text style={styles.typeText}>{type}</Text>
                </View>
            </View>

            <View style={styles.movesContainer}>
                <Text style={styles.movesText}>{moves.join(', ')}</Text>
            </View>

            <View style={styles.weaknessesContainer}>
                <Text style={styles.weaknessesText}>{weaknesses.join(', ')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        borderWidth: 2,
        padding: 16,
        margin: 16,
        ...Platform.select({
            ios: {
                shadowOffset: { width: 2, height: 2 },
                shadowColor: '#333',
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    // 顶部信息栏
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    hp: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
        alignSelf: 'center',
    },

    // 类型标签
    typeContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 4,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    typeEmoji: {
        fontSize: 30,
        marginRight: 12,
    },
    typeText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    movesContainer: {
        marginBottom: 16,
    },
    movesText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    weaknessesContainer: {
        marginBottom: 8,
    },
    weaknessesText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

// import { StyleSheet, View, Text, Image, Platform } from 'react-native';

// export default function PokemonCard({ name, image, type, hp, moves, weaknesses }) {

//     // 根据 type 设置卡片主色调
//     const typeColor = {
//         Fire: '#F08030',
//         Water: '#6890F0',
//         Grass: '#78C850',
//         Electric: '#F8D030',
//         Psychic: '#F85888',
//         Ice: '#98D8D8',
//         Dragon: '#7038F8',
//         Dark: '#705848',
//         Fairy: '#EE99AC',
//         Normal: '#A8A878',
//         Fighting: '#C03028',
//         Flying: '#A890F0',
//         Poison: '#A040A0',
//         Ground: '#E0C068',
//         Rock: '#B8A038',
//         Bug: '#A8B820',
//         Ghost: '#705898',
//         Steel: '#B8B8D0',
//     }[type] || '#ccc';

//     return (
//         <View style={[styles.container, { borderColor: typeColor }]}>
//             {/* 顶部信息栏 */}
//             <View style={styles.header}>
//                 <Text style={[styles.name, { color: typeColor }]}>{name}</Text>
//                 <View style={[styles.hpBadge, { backgroundColor: typeColor }]}>
//                     <Text style={styles.hpText}>HP {hp}</Text>
//                 </View>
//             </View>

//             {/* 图片 */}
//             <View style={styles.imageContainer}>
//                 <Image style={styles.image} source={image} resizeMode="contain" />
//             </View>

//             {/* 类型 */}
//             <View style={styles.typeContainer}>
//                 <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
//                     <Text style={styles.typeText}>{type}</Text>
//                 </View>
//             </View>

//             {/* 技能区域 */}
//             <View style={styles.section}>
//                 <Text style={[styles.sectionTitle, { color: typeColor }]}>技能</Text>
//                 <View style={styles.skillsContainer}>
//                     {moves && moves.slice(0, 3).map((move, idx) => (
//                         <View key={idx} style={styles.skillItem}>
//                             <Text style={styles.skillText}>• {move}</Text>
//                         </View>
//                     ))}
//                     {(!moves || moves.length === 0) && (
//                         <Text style={styles.noDataText}>无技能数据</Text>
//                     )}
//                 </View>
//             </View>

//             {/* 弱点区域 */}
//             <View style={styles.section}>
//                 <Text style={[styles.sectionTitle, { color: typeColor }]}>弱点</Text>
//                 <View style={styles.weaknessesContainer}>
//                     {weaknesses && weaknesses.length > 0 ? (
//                         weaknesses.map((weakness, idx) => (
//                             <View key={idx} style={[styles.weaknessBadge, { borderColor: typeColor }]}>
//                                 <Text style={[styles.weaknessText, { color: typeColor }]}>{weakness}</Text>
//                             </View>
//                         ))
//                     ) : (
//                         <Text style={styles.noDataText}>无弱点数据</Text>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "white",
//         borderRadius: 16,
//         borderWidth: 2,
//         padding: 16,
//         margin: 16,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#333',
//                 shadowOffset: { width: 2, height: 2 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 5,
//             },
//         }),
//         borderColor: '#ccc',
//         alignItems: 'center',
//         width: 280,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '100%',
//         marginBottom: 16,
//     },
//     name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     hpBadge: {
//         paddingHorizontal: 12,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     hpText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 14,
//     },
//     imageContainer: {
//         width: 200,
//         height: 200,
//         borderRadius: 100,
//         backgroundColor: '#f5f5f5',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     image: {
//         width: 180,
//         height: 180,
//     },
//     typeContainer: {
//         marginBottom: 20,
//     },
//     typeBadge: {
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         borderRadius: 16,
//     },
//     typeText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     section: {
//         width: '100%',
//         marginBottom: 16,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         borderBottomWidth: 2,
//         borderBottomColor: '#f0f0f0',
//         paddingBottom: 4,
//     },
//     skillsContainer: {
//         backgroundColor: '#f9f9f9',
//         borderRadius: 8,
//         padding: 12,
//     },
//     skillItem: {
//         marginBottom: 4,
//     },
//     skillText: {
//         fontSize: 14,
//         color: '#333',
//     },
//     weaknessesContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 8,
//     },
//     weaknessBadge: {
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         borderWidth: 1,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     },
//     weaknessText: {
//         fontWeight: '500',
//         fontSize: 14,
//     },
//     noDataText: {
//         fontSize: 14,
//         color: '#999',
//         fontStyle: 'italic',
//     },
// });
