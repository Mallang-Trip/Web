const html = `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Payple Callback</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;color:#333}</style></head><body><div>결제 처리를 완료하는 중입니다...</div><script>(function(){try{if(window.opener&&window.opener.postMessage){window.opener.postMessage({type:'PAYPLE_AUTH_RETURN'}, window.location.origin);} }catch(e){} setTimeout(function(){try{window.close();}catch(e){}},200);})();</script></body></html>`;

export async function POST() {
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET() {
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
