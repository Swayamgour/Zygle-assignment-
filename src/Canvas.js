import React from 'react';

function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'red';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('A', canvas.width / 2, canvas.height / 2);
  }, []);
  
  // https:// 

  function downloadCanvas() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas-pixel-data.txt';

    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let hexString = '';
    for (let i = 0; i < data.length; i += 4) {
      hexString += '#' + ('000000' + ((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]).toString(16)).slice(-6) + '\n';
    }

    const blob = new Blob([hexString], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  return (
    <div>
      <canvas ref={canvasRef} width={16} height={34} />
      
      <br/>
      <button onClick={downloadCanvas}>Download</button>
    </div>
  );
}

export default Canvas;
