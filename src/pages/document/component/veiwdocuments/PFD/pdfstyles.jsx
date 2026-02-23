import { StyleSheet, Font } from "@react-pdf/renderer";
import thaifonts from './fonts/THSarabunNew.ttf'
import thaifonsbold from './fonts/THSarabunNew Bold.ttf'
Font.register(
  {
    family: "THSarabunNew",
    fonts: [
      {
        src: thaifonts,
        fontWeight: 'normal',
      },
      {
        src: thaifonsbold,
        fontWeight: 'bold',
      },
    ],
  }
);


export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    padding: "10px",
    // fontFamily: 'thsarabunnew'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
    // fontFamily: 'thsarabunnew'
  },
  bodyheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
    // fontFamily: 'thsarabunnew'
  },
  footerbody: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 3,
    marginTop:5,
    gap: "2px",
    // marginTop:10
    // fontFamily: 'thsarabunnew'
  },
     bodyimages: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
    // fontFamily: 'thsarabunnew'
  },
  body: {
    flexDirection: "row",
    justifyContent:'flex-start',
    // marginBottom: 10,
    // fontFamily: 'thsarabunnew'
  },
    bodyspace: {
    flexDirection: "row",
    justifyContent:'space-between'
    // marginBottom: 10,
    // fontFamily: 'thsarabunnew'
  },
  title: {
    fontSize: 24,
  },
  textcompanystart50: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
    // backgroundColor:'#d8d6d3',
    // alignContent: 'center',
  },
  textcompanystart: {
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-start',
    // backgroundColor:'#d8d6d3',
    // alignContent: 'center',
  },
  textcompanycenter: {
    display: 'flex',
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'center',
    // backgroundColor:'#d8d6d3',
    alignContent: 'center',
  },
  textcompanyend: {
    display: 'flex',
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'flex-end',
    // backgroundColor:'#d8d6d3',
    alignContent: 'center',
  },
  texbody50:{
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
   justifyContent:'space-between',
    // backgroundColor:'#d8d6d3',
  },
  textBoldfonts12: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 12,
   
    // fontWeight:"Bold"
  },
  textBoldfonts11: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 11,
    // fontWeight:"Bold"
  },
  textBoldfonts10: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 10,
    // fontWeight:"Bold"
  },
  textBoldfonts9: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 9,
    // fontWeight:"Bold"
  },
  textBoldfonts95: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 9.5,
    // fontWeight:"Bold"
  },
  textBoldfonts14: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 14,
    fontWeight:"Bold"
  },
  textBoldfonts18: {
    display: 'flex',
    fontFamily: "THSarabunNew",
    fontSize: 18,
    fontWeight:"Bold"
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  billTo: {
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderColor: "1px solid #f3f4f6",
    margin: "1px 0",
    alignContent:'center'
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  td: {
    padding: 0,
    justifyContent:'center',
    alignContent:'center'
  },
  totals: {
    display: "flex",
    alignItems: "flex-end",
  },
  tdunit1:{
    border: '0px solid #f3f4f6',
    padding:2
  },
  tdunit2:{
    border: '1px solid ',
    backgroundColor:'#f8f9f9',
    padding:2
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "Helvetica-Bold",
    // marginTop:10
  },
  imagesbox:{
    display:'flex',
    objectFit:'contain',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:120,
    width:'auto'
  }
});


