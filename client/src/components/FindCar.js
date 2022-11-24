import React from "react";
import { flushSync } from "react-dom";
import Nigga from '../../assests/Images/NiggaCar.jpg';
import {AiFillCar} from 'react-icons/ai';
import {MdSettingsSuggest} from 'react-icons/md';
import {ImRoad} from 'react-icons/im';
import {HiLocationMarker} from 'react-icons/hi';
function FindCar(){
    return (
        <div style={{display: 'grid',  justifyContent:'center', alignItems:'center'}}>
            <div style={{display: "flex", justifyContent:'center', alignItems:'center'}}>
                <h1 style={{color: '#f77d0a', fontSize: '150px', justifyItems:'center',fontWeight:'bold'}}>03</h1>
            </div>
            <div style={{marginTop: -70}}>
                <h2 style={{color: '#2b2e4a', fontSize: '150px', fontWeight:'bold',display: 'flex',  justifyContent:'center', alignItems:'center'}}>FIND YOUR CAR</h2>
            </div>

            <div style={{display:'flex' ,justifyContent:'space-evenly'}}>
                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Lahore</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>

                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Lahore</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>

                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Karachi</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>
            </div>



            <div style={{display:'flex' ,justifyContent:'space-evenly', marginTop:'45px'}}>
                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Karachi</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>

                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Lahore</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>

                <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '50vh', width: '40vh',marginRight:'40px'}}>
                <img height={200} width={300} src={Nigga} />
                <h1 style={{color: '#2b2e4a', fontSize: '25px', marginTop:'-20px', display:'flex', fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Mercedes Benz C180</h1>
                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                    <div>
                        <AiFillCar style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>2015</p>
                    </div>
                    <div>
                        <MdSettingsSuggest style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>AUTO</p>
                    </div>
                    <div>
                        <ImRoad style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'5px'}}>25k</p>
                    </div>
                    <div>
                        <HiLocationMarker style={{height:'30px',width:'30px'}}/>
                        <p style={{marginLeft:'-5px'}}>Lahore</p>
                    </div>

                </div>
                <div className="w-full h-16 flex justify-center">
                            <button className="flex px-10 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     $99.00/day
                 </button>
             </div>  
                </div>
            </div>



            
            
        </div>
        
    )
}
export default FindCar;