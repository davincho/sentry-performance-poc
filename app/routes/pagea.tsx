import { Link } from "remix";

export default function PageA() {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
       <h1>PageA</h1>
       <Link to='/'>Back</Link>
      </div>
    );
  }
  



  