import React, { useState, useRef, useEffect } from 'react'
import "./NavbarUser.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BeenhereIcon from '@mui/icons-material/Beenhere';
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import GradingIcon from '@mui/icons-material/Grading';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import FetchApi from './../../pages/customhooks/Functionapi';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import { Menu, MenuItem, Button } from "@mui/material";
import Badge from '@mui/material/Badge';



const NavbarUser = () => {
    //  sessionStorage.setItem("userId",data.data[0].userId)
    const nameUserlogin = sessionStorage.getItem("userName")
    const userId = sessionStorage.getItem("userId")
    const FetchApis = new FetchApi();

    const [menuList, setMuneList] = useState([])
    const [journalPre, setJourmalPre] = useState([])
    const [countPading, setCountPading] = useState([])

    const [countItemgroup, setCountItemgroup] = useState({Previewnotify:0,Pandingnotify:0,
        rejectgroupnotify:0,totalreject:0,totalEditreject:0});
    const[totalgroup,setTotalgroup]=useState(0)
    const[totalsum,setTotalsum]=useState({sumnotify:0})
    const [Itemgroup, setItemgroup] = useState([])

    const [userAll, setUserAll] = useState([])

    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);




    const [anchorEl, setAnchorEl] = useState(null);
    const openOntiry = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const toggleMenu = () => setOpen(!open);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);


    }, []);

    const handleLogout = () => {
        window.location.href = '/'
        setOpen(false);
    };



    React.useEffect(() => {

        FetchApis.FethcGet(`/groupmenudetail/menuListByUserId/${userId}`).then(res => {
            if (res) {

                setMuneList(res.data)
            }
        })

        notifylistJournal();
        notifygroupItem();
        getuserName();
        notifygroupLength();

    }, [])

    async function notifylistJournal() {
        await FetchApis.FethcGet(`/document/warningNotityByUserId/${userId}`).then(res => { // รอ recieved 
         
            if (res.status == 200) {
                setCountPading(res.data.length)
                setJourmalPre(res.data)
                // console.log(res.data)
            }

        })
    }

    async function notifygroupItem() {
        await FetchApis.FethcGet(`/document/notifylistByIdUser/${userId}`).then(res => { // รอ recieved แบบกลุ่ม

            if (res.status == 200) {
                setCountItemgroup(res.data[0])
                let sumall=Number(res.data[0].Previewnotify)+Number(res.data[0].totalreject)+Number(res.data[0].totalEditreject);
                setTotalsum({...totalsum,sumnotify:sumall})
                setItemgroup(res.data)
            }

        })
    }

        async function notifygroupLength() {
        await FetchApis.FethcGet(`/JournalBygroup/NotifygroupByid/${userId}`).then(res => { // รอ recieved แบบกลุ่ม

            if (res.status == 200) {
                // setCountItemgroup(res.data[0])
                
                setTotalgroup(res.data.length)
         
            }

        })
    }

    function getuserName() {
        FetchApis.FethcGet(`/user/userById/${userId}`).then(res => {
            if (res) {
                setUserAll(res.data[0])
            }
        })
    }

    function isClickToLink(jourid,statusType) {
     
        if(statusType=='201'){
            window.location.href = `/editRejectdocument/${jourid}/201`
        }
        else{
           window.location.href = `/viewdocument/${jourid}/112` 
        }
        
    }

    function isClickTolinkitemgroup(jourid) {
        window.location.href = `/recievjournalgroup/${jourid}`
    }

    const ArrayMenulist = [

        {
            partment: "/workflow",
            menuname: 'workflow',
            iconmenu: <TrendingUpIcon style={{ width: 20, height: 20, color: '#666565' }} />
        },
        {
            partment: "/documentApproved",
            menuname: 'DOCUMENT APPRODED',
            iconmenu: <DescriptionIcon style={{ width: 20, height: 20, color: '#666565' }} />
        }
        ,
        {
            partment: '/documents',
            menuname: 'NEW DOCUMENT',
            iconmenu: <NoteAddIcon style={{ width: 20, height: 20, color: '#666565' }} />
        },
        {
            partment: '/approvelist',
            menuname: 'APPROVE LIST',
            iconmenu: <AssignmentIcon style={{ width: 20, height: 20, color: '#666565' }} />
        },
        {
            partment: '/journalHistory',
            menuname: 'SEARCH HISTORY',
            iconmenu: <FindInPageIcon style={{ width: 20, height: 20, color: '#666565' }} />
        },
        {
            partment: '/reviseGroup',
            menuname: 'REVISEGROUP',
            iconmenu: <ContentPasteSearchIcon style={{ width: 20, height: 20, color: '#666565' }} />
        },
        {
            partment: '/approvedGroup',
            menuname: 'APPROVEDGROUP',
            iconmenu: <BeenhereIcon style={{ width: 20, height: 20, color: '#666565' }} />
        }
    ];

    function inconmenulist(Idicon) {
        let newIcon = ArrayMenulist.find(icon => icon.partment == Idicon)
        return newIcon.iconmenu
    }

    return (
        <div className="navbar">
            <div className="wrapper">

                <div className='items' style={{ width: 'auto', justifyContent: 'space-around' }}>
                    <div style={{ marginRight: 20 }}>
                        <Link to="/workflow" style={{ textDecoration: "none" }}>
                            <label style={{ fontWeight: 'bold', fontSize: 20, color: '#41403f' }}>DOCUMENT FLOW</label>
                        </Link>
                    </div>

                    {menuList.map((item, index) => (
                        <div style={{ marginRight: 20 }}>
                            <Link to={item.routepart} style={{ textDecoration: "none" }}>
                                <div style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', display: 'flex'
                                }}>
                                    {inconmenulist(item.routepart)}
                                    <span className="logo">
                                        <span>
                                        {item.menuname=='APPROVE GROUP'?
                                        <Badge color="error" badgeContent={totalgroup} max={99}>{item.menuname}</Badge>:item.menuname}

                                        {item.menuname=='APPROVE LIST'&&
                                        <Badge color="error" badgeContent={totalsum.sumnotify} max={99}>.</Badge>}

                                        {item.menuname=='NEW DOCUMENT'&&
                                        <Badge color="error" badgeContent={totalsum.sumnotify} max={99}>.</Badge>}
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
                <div className="items">

                    <div className="item" onClick={handleOpen} >
                        <div>
                            <NotificationsNoneOutlinedIcon className="icon" />
                            <div className="counter">{countPading}</div>
                        </div>
                    </div>
                    <div>
                        <Menu
                            anchorEl={anchorEl}
                            open={openOntiry}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            sx={{ marginTop: 1 }}

                        >
                            <MenuItem sx={{ width: 400 }}>
                            <label style={{ color: 'red' }}>แจ้งเตือน ({journalPre.length})</label>
                                {/* {totalsum.sumnotify > 0?"1":""} */}
                            </MenuItem>
                            {journalPre.map((item, index) => (
                                <MenuItem onClick={handleClose}>
                                
                                    {/* <Link to={`/viewdocument/${item.JournalID}/112`}> */}
                                    <div onClick={() => isClickToLink(item.JournalID,item.statusflow)}>
                                        <label>เอกสาร : </label>
                                        <label>{item.JournalCode}</label>
                                        
                                    </div>
                                    {/* </Link> */}
                                </MenuItem>

                            ))}
                            {/* <Divider />
                            <MenuItem>
                                <label>แจ้งเตือนเอกสารกลุ่ม ({countItemgroup})</label>
                            </MenuItem>
                            {Itemgroup.map((item, index) => (
                                <MenuItem>
                                    <div onClick={() => isClickTolinkitemgroup(item.journalGroupID)}>{item.journalGroupID}</div>
                                </MenuItem>
                            ))
                            } */}

                        </Menu>
                    </div>

                    <div className="profile-menu" ref={menuRef}>
                        <div className="profile-button" onClick={toggleMenu}>

                            <AccountCircleIcon style={{ color: 'green' }} />
                            <span>คุณ {nameUserlogin}</span>
                        </div>

                        {open && (
                            <div className="dropdown">
                                <div className="info">
                                    <p><strong>คุณ {userAll.name}</strong></p>
                                    <p className="email">{userAll.email}</p>
                                </div>
                                <label style={{ marginLeft: 10 }}>Code :{userAll.employeeId}</label>

                                <button onClick={handleLogout}>
                                    <label>Logout</label>

                                </button>

                            </div>
                        )}
                    </div>

                </div>
            </div >
        </div >
    )
}

export default NavbarUser