import React, {useEffect} from 'react'
import Prismic from 'prismic.io'
import {useRouter} from 'next/router'
import Head from 'next/head'

const RedirectTo = () =>{
        const router = useRouter()
        useEffect(()=>{
            setTimeout(()=>{    
                router.push("/")
            },2000)
        },[])
        
    return (
        <div className="font-bold mx-auto text-center mt-4">
            <Head>
                <title>Página não encontrada</title>
            </Head>
            <h1 className="font-bold text-4xl" >URL não encontrada</h1>
            <p>Estamos redirecionando você para uma página  central de links</p>
        </div>

    )
}

export async function getServerSideProps({params, res}){
    console.log(params)
    const client = Prismic.client("https://gustavonunes.cdn.prismic.io/api/v2");
    const link = await client.getByUID('shortlink',params.slug);
    if(link){
        res.statusCode= 301 //conteudo removido permanentemente
        res.setHeader('Location',link.data.destino.url)//redireciona
        res.end();
        return;
    }
    console.log(link)
    return {
        props:{},
    }
}


export default RedirectTo;