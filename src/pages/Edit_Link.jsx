import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api'
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';
import '../style/style.css'

// components
import Side_Bar from '../components/Side_Bar';

// assets
import add from '../assets/add-new-pic.png'
import temp1 from '../assets/temp1.png';

const Edit_Link = () => {

    const navigate = useNavigate();

    // data brand from database
    const [dataBrand, setDataBrand] = useState();

    // data links from database
    const [dataLinks, setDataLinks] = useState([]);

    // get data brand
    const { id } = useParams();

    const getGroupEdit = async () => {
        if (id) {
            try {
                const response = await API.get(`/group/${id}`);
                console.log(response);
                setDataBrand(response.data.data);
                setDataLinks(response.data.data.link);
            } catch (error) {
                console.log(error);
            }
        } else {
            return navigate("/links");
        }
    };

    // state update links
    const [links, setLinks] = useState([])

    // state update grouplink
    const [brand, setBrand] = useState({
        imgBrand: dataBrand?.imgBrand,
        title: dataBrand?.title,
        description: dataBrand?.description,
    })

    // state update link
    const [link, setLink] = useState({
        icon: "",
        titleLink: "",
        url: "",
    })

    // onchane group link
    const onChangeBrand = (e) => {
        setBrand({
            ...brand,
            [e.target.name]:
                e.target.type == "file" ? e.target.files : e.target.value
        })
    }

    // onchange link
    const onChangeLink = (e) => {
        setLink({
            ...link,
            [e.target.name]:
                e.target.type == "file" ? e.target.files : e.target.value
        })
    }

    // push link 
    const handleBtnAddLink = (e) => {
        e.preventDefault()
        setLinks([
            ...links,
            link
        ])
        setLink({
            icon: "",
            titleLink: "",
            url: "",
        });
    }

    // update brand
    const updateBrandNLink1 = async (e) => {
        try {
            e.preventDefault()

            const config={
                headers: { 
                    "Content-type": "multipart/form-data",
                    },
            }

            const formBrand = new FormData();
            formBrand.set("imgBrand", brand.imgBrand[0], brand.imgBrand[0].name);
            formBrand.set("title", brand.title);
            formBrand.set("description", brand.description);

            console.log(formBrand);

            const response = await API.patch(`/group/${id}`, formBrand, config);

            if (response.status == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success update brand',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ops... , Something Wrong',
                    showConfirmButton: false,
                    timer: 3000
                })
    
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(error);
        }
    }


    // update links (post)
    const updateBrandNLink = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }

            console.log(links);
            for (let index = 0; index < links.length; index++) {
                const formLinks = new FormData();
                formLinks.set("icon", links[index].icon[0], links[index].icon[0].name);
                formLinks.set("titleLink", links[index].titleLink);
                formLinks.set("url", links[index].url);
                formLinks.set("idBrand", id);

                const response = await API.post('/add-link', formLinks, config)

                getGroupEdit();

                if (response.status == 201) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Success to update brand',
                        text: "Please don't repeat submit again !",
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setTimeout(function () {
                        navigate("/links")
                    }, 2000)
                }
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(error);
        }
    }

    // delete link
    const deleteLink = async (id) => {

        const response = await API.delete(`/link/${id}`);

        getGroupEdit();

        if (response.status == 201) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success delete link',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })

        }
    }


    useEffect(() => {
        getGroupEdit()
    }, []);

    return (
        <div className='section__padding bg-white'>
            <div className='row'>

                <div className='col-3 vh-100 bg-info jp__create_link_side_bar'>
                    <Side_Bar />
                </div>

                <div className='col col-lg-9 vh-100'>
                    <div className='row bg-white py-3'>
                        <h3>Template</h3>
                    </div>

                    <div className='row bg-light pt-lg-4 pt-2'>

                        <div className='row pb-lg-4'>
                            <div className='col-6 col-lg-5 ms-lg-4'>
                                <h5>Create Link</h5>
                            </div>
                            <div className='col-6 text-end'>
                                <button
                                    className='btn btn-warning text-white shadow-none'
                                    onClick={updateBrandNLink}
                                >Publish Link</button>
                            </div>
                        </div>

                        <div className='row pb-5'>

                            <div className='col-12 col-lg-8'>
                                <div className='row'>
                                    <form >
                                        <div className="col-lg-9 col jp__input_area">
                                            <div className="row bg-white ms-lg-4 vh-50 input-data p-3">

                                                {/* image brand area */}
                                                <div className='d-flex align-items-center'>
                                                    <label>
                                                        <div>
                                                            {/* {dataBrand?.imgBrand ? */}

                                                            {brand?.imgBrand ?
                                                                <img
                                                                    src={URL.createObjectURL(brand.imgBrand[0])}
                                                                    style={{
                                                                        width: '100px',
                                                                        height: '100px',
                                                                        objectFit: "cover"
                                                                    }} /> :
                                                                <img
                                                                    src={dataBrand?.imgBrand}
                                                                    style={{
                                                                        width: '100px',
                                                                        height: '100px',
                                                                        objectFit: "cover"
                                                                    }} />
                                                            }

                                                        </div>
                                                        <input
                                                            className='d-none'
                                                            type="file"
                                                            name="imgBrand"
                                                            defaultValue={dataBrand?.imgBrand}
                                                            onChange={onChangeBrand}
                                                        />
                                                    </label>
                                                    <div>
                                                        <button
                                                            className='btn btn-warning ms-5 text-white shadow-none'
                                                            type='submit'
                                                            onClick={updateBrandNLink1}
                                                        >Update TD</button>
                                                    </div>
                                                </div>

                                                {/* titel & desc */}
                                                <div className='row py-3'>
                                                    <label>Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder={dataBrand?.title}
                                                        name='title'
                                                        defaultValue={dataBrand?.title}
                                                        onChange={onChangeBrand}
                                                    />
                                                </div>

                                                <div className='row py-3'>
                                                    <label >Description</label>
                                                    <input
                                                        type="text"
                                                        placeholder={dataBrand?.description}
                                                        name='description'
                                                        
                                                        onChange={onChangeBrand}
                                                        defaultValue={dataBrand?.description}
                                                    />

                                                </div>

                                                {/* datalinks */}
                                                {dataLinks.map((item, index) => {
                                                    return (
                                                        <div key={index} className='d-flex align-items-center py-1 jp__links_link mb-2'>
                                                            <div className='col-4'>
                                                                <img
                                                                    src={`http://localhost:5000/uploads/${item.icon}`}
                                                                    alt="foto"
                                                                    style={{
                                                                        maxWidth: 100,
                                                                        maxheight: 100
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className='col'>
                                                                <div className='row pe-3'>

                                                                    <div className='d-flex align-items-center'>
                                                                        <label className='col-10'>Title Link</label>
                                                                        <label
                                                                            className='col-3 text-white bg-danger p-1 rounded'
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => deleteLink(item.id)}
                                                                        >Delete</label>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        className='mb-1'
                                                                        name='titleLink'
                                                                        defaultValue={item.titleLink}
                                                                    />

                                                                    <label>Link</label>
                                                                    <input
                                                                        type="text"
                                                                        name='url'
                                                                        defaultValue={item.url}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                {/* links */}
                                                {links.map((item, index) => {
                                                    return (
                                                        <div key={index} className='d-flex align-items-center py-1 jp__links_link mb-2'>
                                                            <div className='col-4'>
                                                                {links.icon ?
                                                                    <img
                                                                        src={URL.createObjectURL(item.icon[0])}
                                                                        alt="foto"
                                                                        style={{
                                                                            maxWidth: 100,
                                                                            maxheight: 100
                                                                        }}
                                                                    /> :
                                                                    <img
                                                                        src={add}
                                                                        alt="foto"
                                                                        style={{
                                                                            maxWidth: 100,
                                                                            maxheight: 100
                                                                        }}
                                                                    />
                                                                }
                                                            </div>
                                                            <div className='col'>
                                                                <div className='row pe-3'>

                                                                    <div className='d-flex align-items-center'>
                                                                        <label className='col-10'>Title Link</label>
                                                                        <label
                                                                            className='col-3 text-white bg-danger p-1 rounded'
                                                                            style={{ cursor: 'pointer' }}
                                                                        >Delete</label>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        className='mb-1'
                                                                        name='titleLink'
                                                                        defaultValue={item.titleLink}
                                                                    />

                                                                    <label>Link</label>
                                                                    <input
                                                                        type="text"
                                                                        name='url'
                                                                        defaultValue={item.url}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}


                                                <div className='d-flex align-items-center  py-1 jp__links_link mb-2'>
                                                    <div className='col-4'>
                                                        <label>
                                                            {link.icon ?
                                                                <img
                                                                    src={URL.createObjectURL(link.icon[0])}
                                                                    alt="foto"
                                                                    style={{
                                                                        maxWidth: 100,
                                                                        maxheight: 100
                                                                    }}
                                                                /> :
                                                                <img
                                                                    src={add}
                                                                    alt="foto"
                                                                    style={{
                                                                        maxWidth: 100,
                                                                        maxheight: 100
                                                                    }}
                                                                />
                                                            }
                                                            <input
                                                                className='d-none'
                                                                type="file"
                                                                name="icon"
                                                                required
                                                                defaultValue={link.titleLink}
                                                                onChange={onChangeLink}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='row pe-3'>

                                                            <label>Title Link</label>
                                                            <input
                                                                type="text"
                                                                className='mb-1'
                                                                name='titleLink'
                                                                required
                                                                value={link.titleLink}
                                                                onChange={onChangeLink}
                                                            />

                                                            <label>Link</label>
                                                            <input
                                                                type="text"
                                                                name='url'
                                                                required
                                                                value={link.url}
                                                                onChange={onChangeLink}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className='row d-flex justify-content-center ms-1 py-3 '>
                                                    <button
                                                        className='btn btn-warning text-white shadow-none'
                                                        onClick={handleBtnAddLink}
                                                    >Add Link</button>
                                                </div>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* right section */}
                            <div className='col-12 col-lg-3 mt-4  jp__create_link_image_area'>
                                <img
                                    src={temp1}
                                    alt="template"
                                    className='jp_temp'
                                />

                                <div className="bg-white jp_input-data-2 ">
                                    <div className='row d-felx justify-content-center mt-4'>
                                        {/* {brand ? */}


                                        {brand?.imgBrand ?
                                            <img
                                                src={URL.createObjectURL(brand.imgBrand[0])}
                                                alt="brand"
                                                style={{
                                                    width: 100,
                                                    // height: 50,
                                                    clipPath: "circle()",
                                                }} /> :
                                            <img
                                                src={dataBrand?.imgBrand}
                                                style={{
                                                    width: 100,
                                                    // height: 50,
                                                    clipPath: "circle()",
                                                }} />
                                        }

                                    </div>
                                    <div className='row text-center mt-2 mx-2'>
                                        <span className='fw-bold fs-6'>{dataBrand?.title}</span>
                                        <p
                                            className='text-center'
                                            style={{
                                                fontSize: 11,
                                                overflowWrap: 'break-word'
                                            }}>{dataBrand?.description}</p>
                                    </div>

                                    {dataLinks.map((item) => {
                                        return (
                                            <div key={item.id} className='row  mb-1'>
                                                <div className='col-2 bg-dark offset-1'>
                                                    <img
                                                        src={`http://localhost:5000/uploads/${item.icon}`}
                                                        alt="icon-fb"
                                                        className='p-1'
                                                        style={{
                                                            maxWidth: 30,
                                                            maxHeight: 30,
                                                            clipPath: "circle()",
                                                            backgroundColor: 'white'
                                                        }}
                                                    />
                                                </div>
                                                <div className='col-8 bg-dark d-flex align-items-center justify-content-center'>
                                                    <span className='fs-6 text-white pe-3'>{item.titleLink}</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* link update */}
                                    {links.map((item) => {
                                        return (
                                            <div key={item.id} className='row  mb-1'>
                                                <div className='col-2 bg-dark offset-1'>
                                                    <img
                                                        src={URL.createObjectURL(item.icon[0])}
                                                        alt="icon-fb"
                                                        className='p-1'
                                                        style={{
                                                            maxWidth: 30,
                                                            maxHeight: 30,
                                                            clipPath: "circle()",
                                                            backgroundColor: 'white'
                                                        }}
                                                    />
                                                </div>
                                                <div className='col-8 bg-dark d-flex align-items-center justify-content-center'>
                                                    <span className='fs-6 text-white pe-3'>{item.titleLink}</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit_Link 