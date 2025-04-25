import { useState, useEffect, Suspense, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  TransformControls,
  Grid as DreiGrid,
} from "@react-three/drei";
import FurnitureModel from "../components/3d/FurnitureModel";
import { products } from "../data/products";
import {
  PlusIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping } from "three";

// Room component with textures
function Room({ wallColor = "#ffffff", width = 5, length = 5, height = 3 }) {
  // Load all textures for wood floor
  const [woodColorMap, woodNormalMap, woodRoughnessMap, woodDisplacementMap] =
    useLoader(TextureLoader, [
      "/textures/wood-floor/WoodFloor064_1K-JPG_Color.jpg",
      "/textures/wood-floor/WoodFloor064_1K-JPG_NormalGL.jpg",
      "/textures/wood-floor/WoodFloor064_1K-JPG_Roughness.jpg",
      "/textures/wood-floor/WoodFloor064_1K-JPG_Displacement.jpg",
    ]);

  // Load all textures for plaster walls
  const [
    plasterColorMap,
    plasterNormalMap,
    plasterRoughnessMap,
    plasterDisplacementMap,
  ] = useLoader(TextureLoader, [
    "/textures/plaster/Plaster001_1K-JPG_Color.jpg",
    "/textures/plaster/Plaster001_1K-JPG_NormalGL.jpg",
    "/textures/plaster/Plaster001_1K-JPG_Roughness.jpg",
    "/textures/plaster/Plaster001_1K-JPG_Displacement.jpg",
  ]);

  // Configure wood textures
  [woodColorMap, woodNormalMap, woodRoughnessMap, woodDisplacementMap].forEach(
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(width / 2, length / 2);
    }
  );

  // Configure plaster textures
  [
    plasterColorMap,
    plasterNormalMap,
    plasterRoughnessMap,
    plasterDisplacementMap,
  ].forEach((texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(width / 2, height / 2);
  });

  return (
    <group>
      {/* Floor with all texture maps */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          map={woodColorMap}
          normalMap={woodNormalMap}
          roughnessMap={woodRoughnessMap}
          displacementMap={woodDisplacementMap}
          displacementScale={0.1}
          normalScale={[0.5, 0.5]}
        />
      </mesh>

      {/* Walls with plaster texture */}
      <group position={[0, height / 2, 0]}>
        {/* Back wall */}
        <mesh position={[0, 0, -length / 2]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial
            map={plasterColorMap}
            normalMap={plasterNormalMap}
            roughnessMap={plasterRoughnessMap}
            displacementMap={plasterDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>

        {/* Left wall */}
        <mesh
          position={[-width / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial
            map={plasterColorMap}
            normalMap={plasterNormalMap}
            roughnessMap={plasterRoughnessMap}
            displacementMap={plasterDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>

        {/* Right wall */}
        <mesh
          position={[width / 2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial
            map={plasterColorMap}
            normalMap={plasterNormalMap}
            roughnessMap={plasterRoughnessMap}
            displacementMap={plasterDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>
      </group>
    </group>
  );
}

// Draggable furniture component
function DraggableFurniture({
  modelUrl,
  position,
  rotation,
  scale,
  color,
  isSelected,
  onSelect,
}) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <FurnitureModel
        modelPath={modelUrl}
        scale={scale}
        color={color}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) {
            onSelect();
          }
        }}
      />
      {isSelected && (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}

// Furniture catalog component
function FurnitureCatalog({ onAddFurniture }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-accent-600 text-white rounded-lg"
      >
        <PlusIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 backdrop-filter backdrop-blur-sm bg-white/20 rounded-lg shadow-xl p-4 z-50">
          <h3 className="font-medium text-lg mb-4">Available Furniture</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {products.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onAddFurniture(item);
                  setIsOpen(false);
                }}
                className="flex items-center w-full p-2 hover:bg-gray-50 rounded-lg text-left"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-primary-600">${item.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Controls Panel component
function ControlsPanel({
  wallColor,
  setWallColor,
  roomWidth,
  setRoomWidth,
  roomLength,
  setRoomLength,
  roomHeight,
  setRoomHeight,
  isOpen,
  onToggle,
}) {
  const dimensions = [
    { label: "Width", value: roomWidth, setter: setRoomWidth, min: 3, max: 10 },
    {
      label: "Length",
      value: roomLength,
      setter: setRoomLength,
      min: 3,
      max: 10,
    },
    {
      label: "Height",
      value: roomHeight,
      setter: setRoomHeight,
      min: 2,
      max: 4,
    },
  ];

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-full bg-transparent shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="p-6 backdrop-filter backdrop-blur-sm bg-white/20">
          <h2 className="text-xl font-display font-bold text-primary-900 text-center mb-6">
            My room settings
          </h2>

          <div className="space-y-4 mb-6">
            {dimensions.map(({ label, value, setter, min, max }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm font-medium">{label} (m)</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setter((v) => Math.max(min, +(v - 0.1).toFixed(1)))
                    }
                    className="px-2 py-1 bg-primary-100 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step="0.1"
                    value={value}
                    onChange={(e) => setter(Number(e.target.value))}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() =>
                      setter((v) => Math.min(max, +(v + 0.1).toFixed(1)))
                    }
                    className="px-2 py-1 bg-primary-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Wall Color</h3>
            <input
              type="color"
              value={wallColor}
              onChange={(e) => setWallColor(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-r-lg shadow-lg z-50 ${
          isOpen ? "left-80" : "left-0"
        }`}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-6 w-6 text-primary-900" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-primary-900" />
        )}
      </button>
    </>
  );
}

export default function RoomDesigner() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef();
  const [roomFurniture, setRoomFurniture] = useState([]);
  const [selectedFurnitureIndex, setSelectedFurnitureIndex] = useState(null);
  const [wallColor, setWallColor] = useState("#ffffff");
  const [roomWidth, setRoomWidth] = useState(8);
  const [roomLength, setRoomLength] = useState(8);
  const [roomHeight, setRoomHeight] = useState(4);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [isCustomizingColor, setIsCustomizingColor] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      const { product } = location.state;
      setRoomFurniture([
        {
          ...product,
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: product.customizations?.scale || 1,
          color: product.customizations?.color,
        },
      ]);
    }
  }, [location.state]);

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    // Handle ESC key for deselection
    if (key === "escape") {
      setSelectedFurnitureIndex(null);
      setOrbitControlsEnabled(true);
      return;
    }

    // Only handle movement keys if an item is selected
    if (selectedFurnitureIndex === null) return;

    const moveSpeed = 0.1;
    const rotateSpeed = Math.PI / 4;

    setRoomFurniture((prev) => {
      return prev.map((item, i) => {
        if (i !== selectedFurnitureIndex) return item;

        const [x, y, z] = item.position;
        const [rotX, rotY, rotZ] = item.rotation;
        let newPosition = [x, y, z];
        let newRotation = [rotX, rotY, rotZ];

        switch (key) {
          case "w":
          case "arrowup":
            newPosition = [x, y, z - moveSpeed];
            break;
          case "s":
          case "arrowdown":
            newPosition = [x, y, z + moveSpeed];
            break;
          case "a":
          case "arrowleft":
            newPosition = [x - moveSpeed, y, z];
            break;
          case "d":
          case "arrowright":
            newPosition = [x + moveSpeed, y, z];
            break;
          case "q":
            newPosition = [x, y + moveSpeed, z];
            break;
          case "e":
            newPosition = [x, y - moveSpeed, z];
            break;
          case "r":
            newRotation = [rotX, rotY + rotateSpeed, rotZ];
            break;
          case "f":
            newRotation = [rotX, rotY - rotateSpeed, rotZ];
            break;
          default:
            return item;
        }

        return { ...item, position: newPosition, rotation: newRotation };
      });
    });
  };

  const handleAddFurniture = (item) => {
    setRoomFurniture((prev) => [
      ...prev,
      {
        ...item,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
        color: undefined,
      },
    ]);
  };

  const handleFurnitureSelect = (index) => {
    setSelectedFurnitureIndex(index);
    setOrbitControlsEnabled(false);
  };

  const handleBackgroundClick = (event) => {
    // Only deselect if clicking on the background
    if (event.object.type === "GridHelper" || !event.object) {
      setSelectedFurnitureIndex(null);
      setOrbitControlsEnabled(true);
    }
  };

  // Available colors for customization
  const availableColors = [
    "#FFFFFF", // White
    "#8B4513", // Brown
    "#808080", // Gray
    "#000000", // Black
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-transparent shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeftIcon className="h-6 w-6 text-primary-700" />
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-display font-bold text-primary-900">
                My Room
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {selectedFurnitureIndex !== null && (
                <div className="bg-white px-4 py-2 rounded-lg shadow text-sm">
                  <div className="mb-2">
                    Use WASD or Arrow keys to move the selected item
                    <br />
                    Q/E to move up/down
                    <br />
                    R/F to rotate furniture direction
                    <br />
                    ESC to deselect item
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Color Customization Toggle */}
                    <button
                      onClick={() => setIsCustomizingColor(!isCustomizingColor)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${
                        isCustomizingColor
                          ? "bg-primary-100 border-primary-200 text-primary-900"
                          : "border-gray-300 text-primary-700 hover:bg-gray-50"
                      }`}
                    >
                      <SwatchIcon className="h-4 w-4" />
                      <span>Customize Color</span>
                    </button>

                    {/* Color Selection (only shown when customizing) */}
                    {isCustomizingColor && (
                      <div className="flex items-center space-x-2">
                        {availableColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setRoomFurniture((prev) => {
                                const newFurniture = [...prev];
                                newFurniture[selectedFurnitureIndex] = {
                                  ...newFurniture[selectedFurnitureIndex],
                                  color: color,
                                };
                                return newFurniture;
                              });
                            }}
                            className={`w-6 h-6 rounded-full border-2 ${
                              roomFurniture[selectedFurnitureIndex]?.color ===
                              color
                                ? "border-accent-600"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setRoomFurniture((prev) =>
                          prev.filter(
                            (_, index) => index !== selectedFurnitureIndex
                          )
                        );
                        setSelectedFurnitureIndex(null);
                        setOrbitControlsEnabled(true);
                        setIsCustomizingColor(false);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              )}
              <FurnitureCatalog onAddFurniture={handleAddFurniture} />
            </div>
          </div>
        </div>
      </div>

      {/* Room Designer */}
      <div
        className="relative h-[calc(100vh-80px)]"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={canvasRef}
        style={{ outline: "none" }}
      >
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <Room
              wallColor={wallColor}
              width={roomWidth}
              length={roomLength}
              height={roomHeight}
            />

            {roomFurniture.map((item, index) => (
              <DraggableFurniture
                key={index}
                modelUrl={item.modelUrl}
                position={item.position}
                rotation={item.rotation}
                scale={item.scale}
                color={item.color}
                isSelected={selectedFurnitureIndex === index}
                onSelect={() => {
                  handleFurnitureSelect(index);
                  setIsCustomizingColor(false);
                }}
              />
            ))}

            <DreiGrid
              infiniteGrid
              cellSize={1}
              sectionSize={1}
              fadeDistance={30}
              fadeStrength={1}
              onClick={handleBackgroundClick}
            />

            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-2, 2, -2]} intensity={0.3} color="#fff" />
            <pointLight position={[2, 2, -2]} intensity={0.3} color="#fff" />
            <pointLight position={[-2, 2, 2]} intensity={0.3} color="#fff" />

            <OrbitControls
              makeDefault
              enabled={orbitControlsEnabled}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              enableDamping={false}
            />
            <Environment preset="apartment" />
          </Suspense>
        </Canvas>

        <ControlsPanel
          wallColor={wallColor}
          setWallColor={setWallColor}
          roomWidth={roomWidth}
          setRoomWidth={setRoomWidth}
          roomLength={roomLength}
          setRoomLength={setRoomLength}
          roomHeight={roomHeight}
          setRoomHeight={setRoomHeight}
          isOpen={controlsOpen}
          onToggle={() => setControlsOpen(!controlsOpen)}
        />
      </div>
    </div>
  );
}
