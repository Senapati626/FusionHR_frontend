import React,{useState,useEffect} from 'react';
import dashboardStyles from '../styles/Dashboard.module.css'
import axios from 'axios';
import styles from '../styles/Earning.module.css'
const Earnings = ({userid}) => {
    const [candidates,setCandidates] = useState([])
    useEffect(()=>{
        try {
            axios.get(`https://copper-chipmunk-gown.cyclic.app/referral/${userid}`)
            .then((response)=>setCandidates(response.data))
        } catch (error) {
            console.log(error)
        }
    },[])
    
    let filteredCandidates = candidates.filter((candidate)=>{
        return candidate.hasOwnProperty("joining_date")
    })
    console.log(filteredCandidates)
    return (
        <div className={dashboardStyles.dashboard_container}>
            <div className={dashboardStyles.dashboard_header}>
                <p>Referral Earnings</p>
            </div>
            {filteredCandidates.length === 0 ? 
            <div className={styles.header}>
                <h1>Nothing to show here</h1>
                <p>{'Once a referred candidate joins an organization, your earning status would show here'}</p>
            </div>
            :
            <div className={styles.grid_container}>
                <div className={styles.grid}>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Employer Name</p>
                        <div className={styles.tooltip}>
                            <p>Employer Name</p>
                        </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Candidate Name</p>
                        <div className={styles.tooltip}>
                        <p>Candidate Name</p>
                        </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Job Title</p>
                        <div className={styles.tooltip}>
                        <p>Job Title</p>
                    </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Joining Date</p>
                        <div className={styles.tooltip}>
                        <p>Joining Date</p>
                    </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Guarantee Period</p>
                        <div className={styles.tooltip}>
                        <p>Guarantee Period</p>
                    </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Referral Reward</p>
                        <div className={styles.tooltip}>
                        <p>Referral Reward</p>
                    </div>
                    </div>
                    <div className={`${styles.grid_cell} ${styles.grid_header}`}>
                        <p>Status</p>
                        <div className={styles.tooltip}>
                        <p>Status</p>
                    </div>
                    </div>
                </div>
                {
                    filteredCandidates.map((candidate,index)=>{
                        return(
                            <div className={styles.grid} key={index}>
                                <div className={styles.grid_cell}>
                                    <p>{candidate.post_organization}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                        <p>{candidate.post_organization}</p>
                                    </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{candidate.given_name+' '+candidate.surname}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p>{candidate.given_name+' '+candidate.surname}</p>
                                </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{candidate.post_name}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p>{candidate.post_name}</p>
                                </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{candidate.joining_date.slice(0,10)}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p>{candidate.joining_date.slice(0,10)}</p>
                                </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{''}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p></p>
                                </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{'$'+candidate.reward}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p>{'$'+candidate.reward}</p>
                                </div>
                                </div>
                                <div className={styles.grid_cell}>
                                    <p>{candidate.reward_status}</p>
                                    <div className={styles.tooltip} style={{top:"100%"}}>
                                    <p>{candidate.reward_status}</p>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                }
        </div>
    );
};

export default Earnings;