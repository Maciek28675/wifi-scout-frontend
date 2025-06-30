import { View, Text, StyleSheet, SafeAreaView, Animated} from "react-native";
import MapView, { Circle, LatLng, Marker, Polygon } from "react-native-maps";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import {useState, useCallback, useEffect, useRef} from 'react';
import {Colors} from '@/constants/Colors'
import AnimatedButton from "@/components/AnimatedButton";
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/app/context/ThemeContext';

interface measurementPoint {
    center: LatLng,
    id: number,
    color: string
}
 export default function Home() {
    const { t } = useTranslation();
    const { theme, isDark } = useTheme();

    // Animation scale declarations
    const scaleLegend = useRef(new Animated.Value(1)).current;
    const scaleUpdate = useRef(new Animated.Value(1)).current;

    const [refresh, setRefresh] = useState<boolean>(false);

    const onRefresh = () => {
        setRefresh(true)
    }

    const [region, setRegion] = useState({
        latitude: 51.11226468489964,
        longitude: 17.06031190697346,
        latitudeDelta: 0.02,
        longitudeDelta: 0.015,
      });
    
    useEffect(() => {
        const loadMapData = async () => {

        };

        loadMapData();
    }, []);


    const circlesNew: Array<measurementPoint> = []
    const circles: Array<LatLng> = [
        {latitude: 51.109885535541   , longitude: 17.0578444319407  },
        {latitude: 51.1097173305386  , longitude: 17.0578838494119  },
        {latitude: 51.1097651325801  , longitude: 17.0578726474042  },
        {latitude: 51.1098089065624  , longitude: 17.0578623893383  },
        {latitude: 51.1098853506747  , longitude: 17.0578444750697  },
        {latitude: 51.1098854354099  , longitude: 17.0578444553189  },
        {latitude: 51.1098855352586  , longitude: 17.0578444320454  },
        {latitude: 51.1096330111722  , longitude: 17.0578671830646  },
        {latitude: 51.1095966947083  , longitude: 17.0578701091536  },
        {latitude: 51.1098883228518  , longitude: 17.0578436735299  },
        {latitude: 51.1098883228836  , longitude: 17.0578436736788  },
        {latitude: 51.1098883228836  , longitude: 17.057843673679   },
        {latitude: 51.10959109281    , longitude: 17.0578545026188  },
        {latitude: 51.109584577362   , longitude: 17.0594788525197  },
        {latitude: 51.1095588302774  , longitude: 17.0596020232794  },
        {latitude: 51.1094628649113  , longitude: 17.059839360476   },
        {latitude: 51.1094529791358  , longitude: 17.0598677933606  },
        {latitude: 51.1094883636894  , longitude: 17.0597442752731  },
        {latitude: 51.109350619619   , longitude: 17.0603557303135  },
        {latitude: 51.109351097583   , longitude: 17.060354412529   },
        {latitude: 51.1091521684279  , longitude: 17.0601689196453  },
        {latitude: 51.1091522124498  , longitude: 17.0601686768776  },
        {latitude: 51.109038957072   , longitude: 17.0607990550079  },
        {latitude: 51.1089967089809  , longitude: 17.0608881830883  },
        {latitude: 51.1089384520859  , longitude: 17.0610449937924  },
        {latitude: 51.1089973392671  , longitude: 17.0610121453639  },
        {latitude: 51.1091319946945  , longitude: 17.0602808208894  },
        {latitude: 51.1090019890068  , longitude: 17.060561592275   },
        {latitude: 51.1093602648455  , longitude: 17.0602896012248  },
        {latitude: 51.1090022240724  , longitude: 17.0605617160948  },
        {latitude: 51.1093616655549  , longitude: 17.0602892758806  },
        {latitude: 51.1089423023871  , longitude: 17.0603468271473  },
        {latitude: 51.1091626818719  , longitude: 17.0601624150932  },
        {latitude: 51.1089404422863  , longitude: 17.0603468178847  },
        {latitude: 51.1089389612968  , longitude: 17.0603468114075  },
        {latitude: 51.1089370359911  , longitude: 17.0603468030009  },
        {latitude: 51.1089355116067  , longitude: 17.0603467963469  },
        {latitude: 51.108934080751   , longitude: 17.0603467901011  },
        {latitude: 51.1089327395323  , longitude: 17.0603467842466  },
        {latitude: 51.1089314784717  , longitude: 17.0603467787421  },
        {latitude: 51.1089584809773  , longitude: 17.0610721471373  },
        {latitude: 51.1093578980546  , longitude: 17.0603138433468  },
        {latitude: 51.1091194005418  , longitude: 17.0599575028874  },
        {latitude: 51.108969438725   , longitude: 17.061107785183   },
        {latitude: 51.1091403590717  , longitude: 17.0601622642808  },
        {latitude: 51.1091193895117  , longitude: 17.0599576110198  },
        {latitude: 51.1089934098821  , longitude: 17.0611947436293  },
        {latitude: 51.109119487618   , longitude: 17.0599573664813  },
        {latitude: 51.1091195131101  , longitude: 17.0599573224194  },
        {latitude: 51.1091194100519  , longitude: 17.0599574999106  },
        {latitude: 51.10911941       , longitude: 17.0599574999999  },
        {latitude: 51.10911941       , longitude: 17.0599575        },
        {latitude: 51.1089217376895  , longitude: 17.0603796080257  },
        {latitude: 51.1089279913138  , longitude: 17.0603466828931  },
        {latitude: 51.1089262335401  , longitude: 17.0603465411448  },
        {latitude: 51.1089239973027  , longitude: 17.0603464908701  },
        {latitude: 51.108923232623   , longitude: 17.0603466797373  },
        {latitude: 51.1089225830622  , longitude: 17.0603467193153  },
        {latitude: 51.1092328752649  , longitude: 17.0600261757828  },
        {latitude: 51.1093487219119  , longitude: 17.0603600511319  },
        {latitude: 51.1091320742608  , longitude: 17.0603161454769  },
        {latitude: 51.1088510933734  , longitude: 17.0606137762884  },
        {latitude: 51.1089680595385  , longitude: 17.0605120249571  },
        {latitude: 51.1090804343576  , longitude: 17.0604707495479  },
        {latitude: 51.1089658005544  , longitude: 17.0603629817627  },
        {latitude: 51.1089471385964  , longitude: 17.0603563693096  },
        {latitude: 51.1093485269801  , longitude: 17.0603604567844  },
        {latitude: 51.1092992237785  , longitude: 17.0604371378205  },
        {latitude: 51.1090747170493  , longitude: 17.0604850164126  },
        {latitude: 51.1089808286419  , longitude: 17.0606970656773  },
        {latitude: 51.109046079582   , longitude: 17.060588334752   },
        {latitude: 51.1090906596837  , longitude: 17.0609302811057  },
        {latitude: 51.1089782004491  , longitude: 17.0611301374334  },
        {latitude: 51.1091179827813  , longitude: 17.0612816483112  },
        {latitude: 51.1093785048832  , longitude: 17.0608631805669  },
        {latitude: 51.109125855746   , longitude: 17.0605382190186  },
        {latitude: 51.1088995692944  , longitude: 17.0604197513313  },
        {latitude: 51.1088386037707  , longitude: 17.0602921356457  },
        {latitude: 51.1086703226095  , longitude: 17.0602246602744  },
        {latitude: 51.1088764233756  , longitude: 17.0601157698566  },
        {latitude: 51.1094415004016  , longitude: 17.059860495313   },
        {latitude: 51.1094407828966  , longitude: 17.0598620129182  },
        {latitude: 51.1094400901298  , longitude: 17.0598634584038  },
        {latitude: 51.1094132592976  , longitude: 17.0599005382832  },
        {latitude: 51.1094248438057  , longitude: 17.0598874871458  },
        {latitude: 51.1094248531033  , longitude: 17.0598883733256  },
        {latitude: 51.109438738601   , longitude: 17.059866278403   },
        {latitude: 51.1094159803826  , longitude: 17.0598935560028  },
        {latitude: 51.1094661360441  , longitude: 17.0598828184228  },
        {latitude: 51.1094158324864  , longitude: 17.0598940419452  },
        {latitude: 51.1094246621626  , longitude: 17.0598892191318  },
        {latitude: 51.1094157720657  , longitude: 17.0598942952669  },
        {latitude: 51.1094792259926  , longitude: 17.0599026323697  },
        {latitude: 51.1094792881642  , longitude: 17.0599038629698  },
        {latitude: 51.1093693988075  , longitude: 17.0598667265548  },
        {latitude: 51.109367484939   , longitude: 17.0598652779582  },
        {latitude: 51.1093946942634  , longitude: 17.0598576094458  },
        {latitude: 51.1094521788831  , longitude: 17.0596513009698  },
        {latitude: 51.1094137602577  , longitude: 17.0598126154695  },
        {latitude: 51.1094400653446  , longitude: 17.0598275735237  },
        {latitude: 51.1094721281124  , longitude: 17.0595040182973  },
        {latitude: 51.1094269452953  , longitude: 17.059850401881   },
        {latitude: 51.109433443981   , longitude: 17.0595885865547  },
        {latitude: 51.1094249567919  , longitude: 17.0598538617969  },
        {latitude: 51.1094334439796  , longitude: 17.0595885865585  },
        {latitude: 51.1094694842429  , longitude: 17.0595351095927  },
        {latitude: 51.1094246418783  , longitude: 17.0598544097338  },
        {latitude: 51.1095085864237  , longitude: 17.0594885026545  },
        {latitude: 51.1094246478098  , longitude: 17.0598543583693  },
        {latitude: 51.1095958180851  , longitude: 17.0594671280474  },
        {latitude: 51.1094246040972  , longitude: 17.0598544654626  },
        {latitude: 51.1095679673186  , longitude: 17.0594711936879  },
        {latitude: 51.1094155245095  , longitude: 17.0597353672085  },
        {latitude: 51.109443621763   , longitude: 17.0598264643537  },
        {latitude: 51.1094436579037  , longitude: 17.0596959060601  },
        {latitude: 51.1094103344324  , longitude: 17.0595238262836  },
        {latitude: 51.1095732717831  , longitude: 17.0594889967023  },
        {latitude: 51.1093991339369  , longitude: 17.059505512621   },
        {latitude: 51.1095833546622  , longitude: 17.059460397713   },
        {latitude: 51.1095559946228  , longitude: 17.0594624071876  },
        {latitude: 51.109583363791   , longitude: 17.059472769857   },
        {latitude: 51.109592931061   , longitude: 17.0594654823406  },
        {latitude: 51.1095849702192  , longitude: 17.0594575471251  },
        {latitude: 51.1091075221084  , longitude: 17.0591935705507  },
        {latitude: 51.1095807691684  , longitude: 17.0594544763209  },
        {latitude: 51.109572211491   , longitude: 17.0594483729611  },
        {latitude: 51.1095699993639  , longitude: 17.0594468187001  },
        {latitude: 51.1091078663358  , longitude: 17.0592411075908  },
        {latitude: 51.109426851306   , longitude: 17.0598910814429  },
        {latitude: 51.1095872442976  , longitude: 17.05942010689    },
        {latitude: 51.1094263941928  , longitude: 17.0598920923415  },
        {latitude: 51.1095874350175  , longitude: 17.0594197954072  },
        {latitude: 51.1091645928464  , longitude: 17.0593842459604  },
        {latitude: 51.1095875048785  , longitude: 17.0594195974288  },
        {latitude: 51.1091722708824  , longitude: 17.0594087871618  },
        {latitude: 51.10958759199    , longitude: 17.0594192608057  },
        {latitude: 51.1095875949714  , longitude: 17.0594192036491  },
        {latitude: 51.1090239408729  , longitude: 17.0598691985413  },
        {latitude: 51.1095368303303  , longitude: 17.0594641542998  },
        {latitude: 51.1090132872889  , longitude: 17.0599519967781  },
        {latitude: 51.1095271813538  , longitude: 17.0594771322342  },
        {latitude: 51.1090614738244  , longitude: 17.0599119534369  },
        {latitude: 51.1095273960973  , longitude: 17.0594774870277  },
        {latitude: 51.109025473421   , longitude: 17.0600658312541  },
        {latitude: 51.1089528957834  , longitude: 17.0602280080536  },
        {latitude: 51.1089477926872  , longitude: 17.0602555683165  },
        {latitude: 51.1089275707786  , longitude: 17.0603196761239  },
        {latitude: 51.1095297533654  , longitude: 17.0594797234905  },
        {latitude: 51.1095301654221  , longitude: 17.0594799381135  },
        {latitude: 51.1090097393326  , longitude: 17.0603858042809  },
        {latitude: 51.1094185968431  , longitude: 17.0598843025137  },
        {latitude: 51.1090155689413  , longitude: 17.05995690476    },
        {latitude: 51.1090263509237  , longitude: 17.0598992554243  },
        {latitude: 51.1094153626183  , longitude: 17.0598964078063  },
        {latitude: 51.1090440435457  , longitude: 17.0599759899242  },
        {latitude: 51.1094152539604  , longitude: 17.0598970040371  },
        {latitude: 51.1094151877385  , longitude: 17.059897386846   },
        {latitude: 51.1094150531044  , longitude: 17.0598980019829  },
        {latitude: 51.1094149815683  , longitude: 17.0598983716622  },
        {latitude: 51.1095343521438  , longitude: 17.0597707909447  },
        {latitude: 51.1094677275058  , longitude: 17.0598230292198  },
        {latitude: 51.1094666044571  , longitude: 17.0598239360285  },
        {latitude: 51.1090837319126  , longitude: 17.0591395557146  },
        {latitude: 51.109466550612   , longitude: 17.0598239795059  },
        {latitude: 51.1095288971751  , longitude: 17.0595008953895  },
        {latitude: 51.1094665500209  , longitude: 17.0598239799831  },
        {latitude: 51.10921335999    , longitude: 17.0590273749579  },
        {latitude: 51.1094665735279  , longitude: 17.0598239160787  },
        {latitude: 51.1092159668155  , longitude: 17.0590255238789  },
        {latitude: 51.1095298438128  , longitude: 17.0595904645007  },
        {latitude: 51.1095716708032  , longitude: 17.0594666108782  },
        {latitude: 51.1095296796025  , longitude: 17.0594993400073  },
        {latitude: 51.1095738274435  , longitude: 17.0594999429164  },
        {latitude: 51.1095819437402  , longitude: 17.0594308670722  },
        {latitude: 51.1095846517294  , longitude: 17.0594167763658  },
        {latitude: 51.1095301174163  , longitude: 17.0594984696408  },
        {latitude: 51.1095303333553  , longitude: 17.0594980508442  },
    ]

    for(let i = 0; i<circles.length; i+=1) {

        if (i % 2 == 0) {
            circlesNew.push({
                center: circles[i],
                id: i,
                color: "#F5424280"
            })
        } else if (i % 3 == 0) {
            circlesNew.push({
                center: circles[i],
                id: i,
                color: "#50bf2e80"
            })
        } else {
            circlesNew.push({
                center: circles[i],
                id: i,
                color: "#e3b42780"
            })
        }

    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
            <View style={[styles.optionsContainer, { borderBottomColor: theme.navbarBorder }]}>
                <Text style={[styles.headerText, { color: theme.textPrimary }]}>
                    {t('map.connected_header')}
                </Text>
                <View style={styles.buttonsContainer}>
                    <AnimatedButton 
                        scale={scaleLegend} 
                        onPress={() => { }} 
                        buttonStyles={[
                            styles.legendButtonContainer, 
                            { backgroundColor: theme.cardBackground },
                        ]}
                    >
                        <Text style={[styles.legendButtonText, { color: isDark ? theme.indicatorInfo : theme.gradientLeft }]}>
                            {t('map.legend')}
                        </Text>
                    </AnimatedButton>
                    <AnimatedButton 
                        scale={scaleUpdate} 
                        onPress={onRefresh} 
                        buttonStyles={[
                            styles.updateButtonContainer,
                            { backgroundColor: theme.gradientLeft }
                        ]}
                    >
                        <Text style={styles.updateButtonText}>
                            {t('map.refresh')}
                        </Text>
                    </AnimatedButton>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={region}
                    cameraZoomRange={{ minCenterCoordinateDistance: 200, maxCenterCoordinateDistance: 4000 }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                >
                    {circlesNew.map((item) => (
                        <Circle key={item.id} center={item.center} radius={5} strokeColor="transparent" fillColor={item.color} />
                    ))}
                    {/* TODO: Add campus border*/}
                </MapView>
            </View>
        </SafeAreaView>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        flex: 1,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    optionsContainer: {
        marginVertical: 16,
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginHorizontal: 16
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700'
    },

    legendButtonContainer: {
        flex: 1/2,
        borderRadius: 12,
        borderCurve: 'continuous',
        paddingVertical: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
    },
    updateButtonContainer: {
        backgroundColor: Colors.light.gradientLeft,
        flex: 1/2,
        borderRadius: 12,
        borderCurve: 'continuous',
        paddingVertical: 16,
        shadowColor: '#0e588c',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
    },
    legendButtonText: {
        fontSize: 16,
        fontWeight: '600'
    },
    updateButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
        marginBottom: 8
    }
})