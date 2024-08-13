import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { useSpring, a } from '@react-spring/three';
import { BG_BOOKING } from '../assets/images';

interface ModelTentProps {
  position: [number, number, number];
}

const ModelTent: React.FC<ModelTentProps> = ({ position }) => {
  // Use useGLTF hook to load the .glb model
  const { scene } = useGLTF('/models/tent.glb');

  return (
    <a.group position={position}>
      {/* Adjust scale, rotation, or any other properties as needed */}
      <primitive object={scene} scale={[0.018, 0.018, 0.018]} rotation={[0.1,1,-0.1]} position={[0,-1.5,0]} />
    </a.group>
  );
};

interface CarouselProps {
  angle: number;
  numberTents:number;
}

const CarouselGroup: React.FC<CarouselProps> = ({ angle, numberTents }) => {
  const groupRef = useRef<Group>(null);

  // Interpolating angle for smooth transition
  const { rotationY } = useSpring({ rotationY: angle });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY.get();
    }
  });

  const radius = 11;

  const tents = Array.from({ length: numberTents }, (_, i) => {
      const theta = (i / numberTents) * Math.PI * 2 - Math.PI;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);

      return <ModelTent key={i} position={[x, 0, z]} />;
  });

  return <a.group ref={groupRef} position={[10, 0, 0]}>{tents}</a.group>;
};

const Carousel: React.FC = () => {
  const [angle, setAngle] = useState(0);

  const numberTents = 5;

  const rotateLeft = () => setAngle((prev) => prev -  ((2*Math.PI) / numberTents));
  const rotateRight = () => setAngle((prev) => prev + ((2*Math.PI) / numberTents));

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <ambientLight intensity={10} /> {/* Overall light */}
        <spotLight position={[10, 10, 10]} /> {/* Spot light for highlights */}
        <CarouselGroup angle={angle} numberTents={numberTents}/>
      </Canvas>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button onClick={rotateLeft}>Rotate Left</button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button onClick={rotateRight}>Rotate Right</button>
      </div>
    </div>
  );
};

const Booking: React.FC = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG_BOOKING})`, filter: 'blur(10px)' }}></div>
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.1 }}></div>
      </div>
      <Carousel />
    </div>
  );
};

export default Booking;
