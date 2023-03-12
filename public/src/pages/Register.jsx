import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: false,
    theme: "dark",
  };
  // useEffect(()=> {
  //   if(localStorage.getItem('chat-app-user')){
  //     navigate('/')
  //   }
  //   },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Hasła nie są takie same.", toastOptions);
      return false;
    } else if (username.length > 15) {
      toast.error(
        "Nazwa użytkownika nie może byc dłuższa niż 15 znaków.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error("Długość hasła musi wynosić minimum 8 znaków.", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Wpisz nazwę użytkownika.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Wpisz adres email.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Wpisz hasło.", toastOptions);
      return false;
    } else if (confirmPassword === "") {
      toast.error("Powtórz hasło.", toastOptions);
      return false;
    }
    // else if (username === User.findOne( {username} )) {
    //   toast.error("Nazwa użytkownika jest zajęta", toastOptions);
    //   return false;
    // }
    return true;
  };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>
              Chat <span id="redHeading">4</span>
              <span id="blueHeading">K</span>olejówka
            </h1>
          </div>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Hasło"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Powtórz hasło"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Stwórz użytkownika</button>
          <span>
            Posiadasz już konto? <a href="/login">Zaloguj się</a>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  // background-color: #131324;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='2200' height='1000' preserveAspectRatio='none' viewBox='0 0 2200 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1038%26quot%3b)' fill='none'%3e%3crect width='2200' height='1000' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M1646.851098337493 1011.9226834021362L1727.0821588005915 802.9136251409313 1518.0731005393868 722.6825646778329 1437.8420400762884 931.6916229390378z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M219.9918745696425 682.1120371527759L163.5384019842303 866.763025781294 404.6428631981606 738.5655097381881z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1656.6219881629722 139.51967475073218L1716.918600492193-35.59440266279276 1481.5079107494473 79.22306242151144z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M128.33531294359904 333.5556453076576L-83.97094230310938 436.85397720132755 85.0945894845241 555.2349370104619z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1077.668%2c929.483C1161.323%2c929.939%2c1235.934%2c873.398%2c1271.066%2c797.476C1301.726%2c731.219%2c1268.465%2c659.959%2c1231.526%2c596.987C1195.207%2c535.072%2c1149.363%2c471.285%2c1077.668%2c467.777C1001.163%2c464.034%2c933.712%2c514.259%2c895.318%2c580.538C856.82%2c646.997%2c852.318%2c727.316%2c887.89%2c795.386C926.34%2c868.964%2c994.65%2c929.03%2c1077.668%2c929.483' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M100.52453654258457 95.30263935655431L200.05485008958865 173.06424273253546 266.93209838005833-15.112029275961248z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1996.517%2c745.573C2074.097%2c750.312%2c2158.988%2c735.195%2c2200.282%2c669.347C2243.569%2c600.32%2c2229.31%2c511.36%2c2187.097%2c441.671C2146.485%2c374.625%2c2074.878%2c334.965%2c1996.517%2c332.954C1914.224%2c330.842%2c1826.469%2c358.548%2c1788.207%2c431.435C1751.715%2c500.95%2c1788.356%2c581.402%2c1831.745%2c646.834C1869.672%2c704.03%2c1928.017%2c741.389%2c1996.517%2c745.573' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M352.532%2c663.343C432.836%2c666.237%2c519.681%2c651.718%2c563.008%2c584.044C609.118%2c512.023%2c599.649%2c418.599%2c556.494%2c344.769C513.756%2c271.651%2c437.171%2c220.966%2c352.532%2c223.958C272.204%2c226.797%2c210.139%2c287.547%2c172.105%2c358.357C136.354%2c424.916%2c128.317%2c504.741%2c166.786%2c569.767C204.62%2c633.72%2c278.274%2c660.667%2c352.532%2c663.343' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M622.1982489411919-100.77729178959524L497.6888053072827 90.95043812630823 689.4165352231861 215.45988176021743 813.9259788570953 23.732151844313975z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1760.031%2c437.851C1817.483%2c433.403%2c1854.851%2c384.304%2c1883.887%2c334.53C1913.243%2c284.209%2c1941.775%2c225.345%2c1913.817%2c174.234C1885.116%2c121.764%2c1819.834%2c108.82%2c1760.031%2c108.103C1698.581%2c107.366%2c1633.31%2c119.004%2c1599.724%2c170.469C1563.364%2c226.184%2c1563.601%2c299.62%2c1597.811%2c356.68C1631.135%2c412.262%2c1695.418%2c442.854%2c1760.031%2c437.851' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M786.3914091332125 641.1057131600135L907.4780297385986 878.7515868362606 1145.1239034148457 757.6649662308745 1024.0372828094596 520.0190925546274z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1741.6448381689947 33.09508500813513L1631.801860053719 73.07465948524937 1746.6927108270283 217.84933941960574z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1852.0581958718303 580.3862735683432L1691.822781664676 472.3061219858438 1583.7426300821767 632.5415361929979 1743.978044289331 740.6216877754973z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M784.463%2c813.132C821.088%2c811.559%2c846.174%2c780.379%2c864.065%2c748.382C881.402%2c717.375%2c891.225%2c681.685%2c875.871%2c649.649C858.339%2c613.067%2c825.028%2c581.968%2c784.463%2c582.29C744.296%2c582.609%2c714.414%2c615.626%2c695.532%2c651.079C677.941%2c684.109%2c674.065%2c722.96%2c692.069%2c755.767C710.761%2c789.829%2c745.645%2c814.799%2c784.463%2c813.132' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M370.246%2c846.145C420.441%2c848.206%2c470.27%2c822.15%2c492.838%2c777.268C513.715%2c735.75%2c492.289%2c689.688%2c469.197%2c649.36C445.901%2c608.677%2c417.125%2c562.734%2c370.246%2c563.176C323.776%2c563.614%2c295.894%2c609.954%2c274.474%2c651.195C255.183%2c688.338%2c245.477%2c730.303%2c263.932%2c767.869C284.729%2c810.203%2c323.119%2c844.21%2c370.246%2c846.145' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1524.0789963253776 934.0160967034092L1703.8969818193555 978.8497559019066 1748.7306410178528 799.0317704079289 1568.912655523875 754.1981112094314z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M904.972%2c327.937C971.515%2c329.285%2c1013.247%2c264.396%2c1046.414%2c206.692C1079.425%2c149.259%2c1110.191%2c82.971%2c1079.524%2c24.253C1047.165%2c-37.706%2c974.866%2c-65.063%2c904.972%2c-64.128C836.807%2c-63.216%2c768.668%2c-32.229%2c738.326%2c28.817C710.369%2c85.065%2c742.548%2c146.285%2c773.118%2c201.157C804.923%2c258.245%2c839.635%2c326.614%2c904.972%2c327.937' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1574.627%2c671.697C1640.783%2c671.772%2c1691.341%2c618.629%2c1722.54%2c560.292C1751.749%2c505.675%2c1757.893%2c440.603%2c1726.892%2c386.983C1695.922%2c333.415%2c1636.457%2c302.058%2c1574.627%2c304.454C1516.538%2c306.705%2c1470.558%2c347.684%2c1441.518%2c398.044C1412.51%2c448.349%2c1401.891%2c507.739%2c1427.291%2c559.958C1456.188%2c619.367%2c1508.563%2c671.622%2c1574.627%2c671.697' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M696.948549836032 70.9851731317261L656.1539353159577 280.8552710909353 866.0240332751669 321.6498856110096 906.8186477952412 111.77978765180043z' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M470.26%2c1194.018C557.886%2c1191.377%2c630.973%2c1130.845%2c670.952%2c1052.826C707.494%2c981.513%2c697.471%2c898.303%2c657.329%2c828.953C617.275%2c759.755%2c550.081%2c710.72%2c470.26%2c706.113C381.421%2c700.986%2c288.515%2c729.324%2c241.636%2c804.961C192.57%2c884.126%2c200.273%2c985.292%2c247.46%2c1065.591C294.008%2c1144.803%2c378.426%2c1196.786%2c470.26%2c1194.018' fill='rgba(139%2c 26%2c 26%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1038'%3e%3crect width='2200' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    img {
      height: 5rem;
      margin-bottom: 1rem;
    }
  }
  h1 {
    color: #dedee0;
  }
  #redHeading {
    color: #e00206;
    font-size: 56px;
    text-transform: uppercase;
  }
  #blueHeading {
    color: #1A3D82;
    font-size: 50px;
    text-transform: uppercase;
  }
  form{
    display:flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(45, 45, 45, 0.6);
    border-radius: 1.5rem;
    padding: 3rem;
  }
  input {
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #1A3D82;
    padding 1rem;
    color: #dedee0;
    width: 100%;
    font-size: 14px;
    transition: 0.5s ease-in-out;
  }
  input:focus{
    border-bottom: 2px solid #9C9CF0;
    outline: none;
  }
  button{
    background-color: #1A3D82;
    color: #dedee0;
    padding: 1rem 2rem;
    border: none;
    border-radius: 2rem;
    box-shadow: 0 0 5px #000000;
    cursor: pointer;
    font-size: 18px;
    transition: 0.5s ease-in-out;
  }
  button:hover{
    background-color: #9C9CF0; 
    scale: 1.05;
    color: #000000;
  }
  span{
    color: #dedee0;
    font-size: 14px;
    a{
      float: right;
      color: #C4D8FF;
      text-decoration: none;
    }
  }
`;

export default Register;
