import React from 'react'
import Prismic from 'prismic.io'
import Head from 'next/head'


const Index = ({data}) => {
    console.log("client");
    return (
        <div 
        style={{ 
            backgroundColor: data.cor_de_fundo, 
            color: data.cor_de_texto 
            }}
        >
                 <Head>
                    <title>{data.pagetitle}</title>
                </Head>    
        <div className="w-1/2 mx-auto text-center">
        <h1 className="text-4xl font-bold p-8">{data.titulo}</h1>
            <img className="mx-auto rounded-full shadow-2xl w-1/4" src={data.logo.url} />   
                <ul>
                    {data.body.map((item) =>{
                        if(item.slice_type === 'secao'){
                            return <h2 className="font-bold text-2xl p-8 pt-4">{item.primary.nome}</h2>
                        }
                        
                        if(item.slice_type === 'link'){
                            return (
                                <div>
                                    <a 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block"
                                    href={item.primary.destino.url}>
                                        {item.primary.texto_do_botao}
                                    </a>

                                </div>
                            );
                       
                        }

                        if(item.slice_type === 'imagem'){
                            return(
                                <img src={item.primary.imagem.url} className="mx-auto"/>
                            )
                        }
                       
                       return null;   
                    })}
                </ul>    
            </div>        
            <div className="text-center py-4 ">
                    Projeto criado durante o evento Dev10k <a href="https://devpleno.com">Modificado</a>
                    <br />
                    Codigo Fonte disponível em: ...
            </div>                        
        </div>
    );
}

export async function getServerSideProps() {
    console.log("server");
    const client = Prismic.client("https://gustavonunes.cdn.prismic.io/api/v2");
    const centralLinks = await client.getSingle("centrallinks")
    console.log(centralLinks);
    return {
        props: {
            data: centralLinks.data
        }
    }
}


export default Index;