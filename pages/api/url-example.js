export default async function handler(request, res) {
    const { searchParams } = request.nextUrl;
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';
   
    return res.status(500).send(title);
  }