import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import dashboardStyles from '../../../styles/Dashboard.module.css'
import Dashboard from '../../../components/Dashboard';
import Saved from '../../../components/Saved'
import Earnings from '../../../components/Earnings';
import Myreferrals from '../../../components/Myreferrals';
import axios from 'axios';
import Link from 'next/link'

const index = ({userdetails}) => {
    const router = useRouter()
    const {id} = router.query
    const [component,setComponent] = useState("postings")
    const [postings,setPostings] = useState([])
    const [showsidebar,setShowsidebar] = useState(false)
    const [showprofile,setShowprofile] = useState(false)
    useEffect(()=>{
        try {
            axios.get("https://copper-chipmunk-gown.cyclic.app/postings")
            .then((response)=>setPostings(response.data))
        } catch (error) {
            console.log(error)
        }
    },[component])

    let filteredPostings = postings.filter((posting)=>{
        return posting.saved_users.includes(id)
    })
    return (
        <div>
            <navbar className={dashboardStyles.navbar}>
                <div className={dashboardStyles.navbar_top_left}>
                    <p className={dashboardStyles.logo} onClick={()=>setComponent("postings")}>Fusion<span>H</span><span>R</span></p>
                </div>
                <div className={dashboardStyles.navbar_middle}>
                    <button onClick={()=>setComponent("postings")} style={component === "postings" ? {color:"#141415"} : {color: "gray"}}>Jobs</button>
                    <button onClick={()=>setComponent("saved")} style={component === "saved" ? {color:"#141415"} : {color: "gray"}}>Saved</button>
                    <button onClick={()=>setComponent("referrals")} style={component === "referrals" ? {color:"#141415"} : {color: "gray"}}>Referrals</button>
                    <button onClick={()=>setComponent("earnings")} style={component === "earnings" ? {color:"#141415"} : {color: "gray"}}>Earnings</button>
                </div>
                <div className={dashboardStyles.navbar_top_right}>
                    <img src='/assets/user.png' alt={'Welcome '+userdetails[0].fullName} width="36px" height="36px" onClick={()=>setShowprofile(!showprofile)}/>
                    <div className={dashboardStyles.navbar_profile} style={showprofile ? {display:"flex"} : {display:"none"}}>
                        <div className={dashboardStyles.navbar_profile_triangle}></div>
                        <p>{`Welcome ${userdetails[0].fullName}`}</p>
                        <button><Link href="/">Sign Out</Link></button>
                    </div>
                </div>
                <div className={dashboardStyles.navbar_hamburger} onClick={()=>setShowsidebar(!showsidebar)}>
                    <div style={showsidebar ? {opacity:"0"} : {opacity:"1"}}></div>
                    <div style={showsidebar ? {transform:"rotate(45deg)"} : {transform:"rotate(0deg)"}}></div>
                    <div style={showsidebar ? {transform:"rotate(-45deg)"} : {transform:"rotate(0deg)"}}></div>
                    <div style={showsidebar ? {opacity:"0"} : {opacity:"1"}}></div>
                </div>
            </navbar>
            <sidebar className={dashboardStyles.sidebar_container} style={showsidebar ? {transform:"translateX(0)"} : {transform:"translateX(100%)"}}>
                <p>{`Welcome ${userdetails[0].fullName}`}</p>
                <button onClick={()=>{setComponent("postings");setShowsidebar(false)}} style={component === "postings" ? {color:"#141415"} : {color: "gray"}}>Jobs</button>
                <button onClick={()=>{setComponent("saved");setShowsidebar(false)}} style={component === "saved" ? {color:"#141415"} : {color: "gray"}}>Saved</button>
                <button onClick={()=>{setComponent("referrals");setShowsidebar(false)}} style={component === "referrals" ? {color:"#141415"} : {color: "gray"}}>Referrals</button>
                <button onClick={()=>{setComponent("earnings");setShowsidebar(false)}} style={component === "earnings" ? {color:"#141415"} : {color: "gray"}}>Earnings</button>
                <Link href="/">Sign Out</Link>
            </sidebar>
                {postings.length === 0 ? 
                    <div>
                        <h1>Loading</h1>
                    </div> : 
                    <div className={dashboardStyles.container}>
                        <div className={dashboardStyles.container_right}>
                        {component === "saved" ? <Saved postings={filteredPostings} userid={id} userdetails={userdetails[0]}/> : 
                        component === "earnings" ? <Earnings userid={id}/> :
                        component === "referrals" ? <Myreferrals userdetails={userdetails[0]}/> :
                        <Dashboard unfilteredPostings={postings} userid={id} userdetails={userdetails[0]}/>
                        }
                        </div>
                    </div>}


        </div>
    );
};

export const getServerSideProps = async(context)=>{
    const responseUsers = await fetch(`https://copper-chipmunk-gown.cyclic.app/userdetails/${context.params.id}`)
    const userdetails = await responseUsers.json()
    return{
        props:{
            userdetails
        }
    }
}



export default index;

