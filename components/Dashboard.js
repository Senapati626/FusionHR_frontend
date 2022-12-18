import React,{useState} from 'react';
import dashboardStyles from '../styles/Dashboard.module.css'
import axios from 'axios';
import Referaction from './Referaction';


const Dashboard = ({unfilteredPostings,userid,userdetails}) => {
    const [linkStatus, setLinkStatus] = useState("none")
    const [searchText, setSearchText] = useState("")
    const savePosting = async(e)=>{
        let posting = e.currentTarget.value
        const response = await axios.post("https://copper-chipmunk-gown.cyclic.app/saveuser",{
            userid: userid,
            posting: posting
        })
        if(response.status===200){
            const eles = document.querySelectorAll("#saveBtn")
            eles.forEach((ele)=>{
                if(ele.value===posting){
                    ele.innerHTML = '<svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="m0 512v-464c0-26.51 21.49-48 48-48h288c26.51 0 48 21.49 48 48v464l-192-112z"/></svg>'
                }
            })
        }
    }
    const openReferTab = (e)=>{
        const tab = document.getElementById(e.currentTarget.value)
        tab.style.display = "grid"
    }
    const closeReferTab = (e)=>{
        const tab = document.getElementById(e.currentTarget.value)
        tab.style.display = "none"
    }
    const clearSearch = ()=>{
        const searchField = document.getElementById('searchbar')
        searchField.value = ""
        setSearchText("")
    }
    const postings = unfilteredPostings.filter((item)=>{
        return item.post_name.toLowerCase().includes(searchText.toLowerCase())
    })
    console.log(userdetails)
    return (
            <div className={dashboardStyles.dashboard_container}>
                <div className={dashboardStyles.searchBar}>
                    <input type="text" placeholder="Job Title or keyword" onChange={(e)=>setSearchText(e.target.value)} id='searchbar'/>
                    <button onClick={clearSearch}>x</button>
                </div>
                {postings.map((posting,index)=>{
                    return(
                    <div className={dashboardStyles.card} key={index}>
                        <div className={dashboardStyles.refer_container} id={posting._id}>
                            <Referaction postingId={posting._id} userId={userid} postName={posting.post_name} questions={posting.screening_questions} postOrganization={posting.organization} useremail={userdetails.emailAddress} username={userdetails.fullName} linkavailable={'true'} reward={posting.referral_reward}/>
                            <button onClick={closeReferTab} value={posting._id} className={dashboardStyles.refer_close_btn}>Cancel</button>
                        </div>
                        <div className={dashboardStyles.card_left}>
                            <button className={dashboardStyles.save_btn} style={{right:"4em"}} onClick={()=>navigator.clipboard.writeText(`http://localhost:3000/candidate/${userid}?posting=${posting._id}`).then(alert('Referral link copied to clipboard. Send the link to candidate.'))}>
                                <img src='/assets/share.png' alt='Share'/>
                            </button>
                            {posting.saved_users.includes(userid) ?
                            <button className={dashboardStyles.save_btn}>
                                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="m0 512v-464c0-26.51 21.49-48 48-48h288c26.51 0 48 21.49 48 48v464l-192-112z"/></svg>
                            </button>    
                            :
                            <button className={dashboardStyles.save_btn} value={posting._id} onClick={savePosting} id="saveBtn">
                                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="m336 0h-288c-26.51 0-48 21.49-48 48v464l192-112 192 112v-464c0-26.51-21.49-48-48-48zm0 428.43-144-84-144 84v-374.43a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996z"/></svg>
                            </button>
                            }
                            <div>
                                <div className={dashboardStyles.post_name}>
                                    <p>{posting.post_name}</p>
                                </div>
                                <div className={dashboardStyles.post_detail}>
                                    <p>{posting.organization}</p>
                                    <p>{posting.location}</p>
                                </div>
                                <div className={dashboardStyles.post_skills}>
                                    {posting.skills.map((skill,index)=>{
                                        return <span key={index}>{skill}</span>
                                    })}
                                </div>
                            </div>
                            <div className={dashboardStyles.post_status} style={posting.status==="open" ? {display: "none"} : {display: "block"}}>
                                <p>{posting.status}</p>
                            </div>
                            <div className={dashboardStyles.post_links}>
                                <button onClick={()=>setLinkStatus(`description${posting._id}`)}>Job Description</button>
                                <button onClick={()=>setLinkStatus(`insights${posting._id}`)}>Job Insights</button>
                                <button onClick={()=>setLinkStatus(`screening${posting._id}`)} style={posting.screening_questions.length===0 ? {display:"none"} : {display:"block"}}>Screening Questions</button>
                            </div>
                            {linkStatus===`description${posting._id}` ?
                            <div className={dashboardStyles.post_expand} style={linkStatus===`description${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                                <div className={dashboardStyles.post_description_top}>
                                    <p><strong>Experience Level: </strong>{posting.job_description.experience_level}</p>
                                    <p><strong>Experience Required: </strong>{posting.job_description.experience_reqd}</p>
                                    <p><strong>Education Level: </strong>{posting.job_description.education_level}</p>
                                    <p><strong>Job Function: </strong>{posting.job_description.job_function}</p>
                                    <p><strong>Industry: </strong>{posting.job_description.industry}</p>
                                </div> 
                                <div className={dashboardStyles.post_description_bottom}>
                                    <div>
                                    {posting.job_description.description.map((item)=>{
                                        return <p>{item}</p>
                                    })}
                                    </div>
                                    <div>
                                    <p><strong>Responsiblities:</strong></p>
                                    <ul className={dashboardStyles.post_responsiblities}>
                                        {posting.job_description.responsiblities.map((item)=>{
                                            return <li>{item}</li>
                                        })}
                                    </ul>
                                    </div>
                                </div>
                                <div className={dashboardStyles.post_expand_close}>
                                    <button onClick={()=>setLinkStatus("none")}>Close</button>
                                </div> 
                            </div>
                            : linkStatus === `screening${posting._id}` ?
                            <div className={dashboardStyles.post_expand} style={linkStatus===`screening${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                                <ul style={{paddingLeft:"1.75em"}}>
                                    {posting.screening_questions.map((question)=>{
                                        return <li>{question}</li>
                                    })}
                                </ul>
                                <div className={dashboardStyles.post_expand_close}>
                                    <button onClick={()=>setLinkStatus("none")}>Close</button>
                                </div> 
                            </div> 
                            : linkStatus === `insights${posting._id}` ?
                            <div className={dashboardStyles.post_expand} style={linkStatus===`insights${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                                <ul style={{paddingLeft:"1.75em"}}>
                                    {posting.job_insights.map((insight)=>{
                                        return <li>{insight}</li>
                                    })}
                                </ul>
                                <div className={dashboardStyles.post_expand_close}>
                                    <button onClick={()=>setLinkStatus("none")}>Close</button>
                                </div> 
                            </div>  
                            :
                            <div className={dashboardStyles.post_expand}></div>
                            }
                        </div>
                        <div className={dashboardStyles.card_right}>
                            <div className={dashboardStyles.post_employment} style={posting.employment==="Contract" ? {backgroundColor:"#1b7c2e"} : {backgroundColor:"#E5625E"}}>
                                <p>{posting.employment}</p>
                            </div>
                            <div className={dashboardStyles.post_reward}>
                                <p style={{fontSize:"0.875em",fontWeight:"300"}}>Referral Reward</p>
                                <p style={{fontSize:"1.5em",fontWeight:"500"}}>${posting.referral_reward}</p>
                                <p style={{fontSize:"0.875em",fontWeight:"300",marginBlock:"0.5rem"}}>Guarantee Period: {posting.guarantee_period} days</p>
                                <button className={dashboardStyles.refer_btn} onClick={openReferTab} value={posting._id} style={posting.status==="open" ? {display: "block"} : {display: "none"}}>Refer</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>            
    );
};

export default Dashboard;

