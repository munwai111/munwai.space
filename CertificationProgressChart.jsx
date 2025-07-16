import React, { useState, useEffect } from 'react'

const CertificationProgressChart = ({ deviceInfo = {} }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedPoints, setAnimatedPoints] = useState([])

  const data = [
    { year: '2022', certifications: 2, cumulative: 2 },
    { year: '2023', certifications: 6, cumulative: 8 },
    { year: '2024', certifications: 9, cumulative: 17 },
    { year: '2025', certifications: 3, cumulative: 20 }
  ]

  // Get responsive chart dimensions
  const getChartDimensions = () => {
    if (deviceInfo.isFlipPhone) {
      return {
        chartHeight: 200,
        chartWidth: 280,
        marginLeft: 40,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 60,
        fontSize: '10px',
        strokeWidth: 2
      }
    } else if (deviceInfo.isMobile) {
      return {
        chartHeight: 250,
        chartWidth: 350,
        marginLeft: 50,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 70,
        fontSize: '12px',
        strokeWidth: 2.5
      }
    } else if (deviceInfo.isTablet) {
      return {
        chartHeight: 300,
        chartWidth: 500,
        marginLeft: 60,
        marginRight: 50,
        marginTop: 50,
        marginBottom: 80,
        fontSize: '14px',
        strokeWidth: 3
      }
    } else if (deviceInfo.isTV) {
      return {
        chartHeight: 500,
        chartWidth: 1000,
        marginLeft: 120,
        marginRight: 120,
        marginTop: 80,
        marginBottom: 140,
        fontSize: '20px',
        strokeWidth: 4
      }
    } else {
      // Desktop default
      return {
        chartHeight: 320,
        chartWidth: 700,
        marginLeft: 80,
        marginRight: 80,
        marginTop: 60,
        marginBottom: 100,
        fontSize: '16px',
        strokeWidth: 3
      }
    }
  }

  const dimensions = getChartDimensions()
  const { chartHeight, chartWidth, marginLeft, marginRight, marginTop, marginBottom, fontSize, strokeWidth } = dimensions

  const maxValue = Math.max(...data.map(d => d.cumulative)) + 2 // Add buffer

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate points with staggered timing
          data.forEach((point, index) => {
            setTimeout(() => {
              setAnimatedPoints(prev => [...prev, point])
            }, index * 300)
          })
        }
      },
      { threshold: 0.3 }
    )

    const chartElement = document.getElementById('certification-chart')
    if (chartElement) {
      observer.observe(chartElement)
    }

    return () => observer.disconnect()
  }, [])

  const getPointPosition = (index, value) => {
    const plotWidth = chartWidth - marginLeft - marginRight
    const plotHeight = chartHeight - marginTop - marginBottom
    
    const x = marginLeft + (index / (data.length - 1)) * plotWidth
    const y = marginTop + plotHeight - ((value / maxValue) * plotHeight)
    return { x, y }
  }

  const generatePath = () => {
    if (animatedPoints.length === 0) return ''
    
    let path = ''
    animatedPoints.forEach((point, index) => {
      const pos = getPointPosition(index, point.cumulative)
      if (index === 0) {
        path += `M ${pos.x} ${pos.y}`
      } else {
        // Create smooth curve
        const prevPos = getPointPosition(index - 1, animatedPoints[index - 1].cumulative)
        const cpx1 = prevPos.x + (pos.x - prevPos.x) * 0.5
        const cpx2 = pos.x - (pos.x - prevPos.x) * 0.5
        path += ` C ${cpx1} ${prevPos.y} ${cpx2} ${pos.y} ${pos.x} ${pos.y}`
      }
    })
    return path
  }

  const plotAreaBottom = chartHeight - marginBottom
  const plotAreaRight = chartWidth - marginRight

  return (
    <div className={`${
      deviceInfo.isFlipPhone ? 'py-6' : deviceInfo.isMobile ? 'py-8' : deviceInfo.isTablet ? 'py-10' : 'py-12'
    }`}>
      <div 
        id="certification-chart" 
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl mx-auto ${
          deviceInfo.isFlipPhone ? 'p-4 max-w-sm' : 
          deviceInfo.isMobile ? 'p-6 max-w-md' : 
          deviceInfo.isTablet ? 'p-8 max-w-2xl' : 
          deviceInfo.isTV ? 'p-16 max-w-7xl' : 
          'p-10 max-w-5xl'
        }`}
      >
        <div className="text-center mb-8">
          <h3 className={`font-bold text-gray-900 dark:text-white mb-4 ${
            deviceInfo.isFlipPhone ? 'text-lg' : 
            deviceInfo.isMobile ? 'text-xl' : 
            deviceInfo.isTablet ? 'text-2xl' : 
            deviceInfo.isTV ? 'text-5xl' : 
            'text-3xl'
          }`}>
            Learning Journey Timeline
          </h3>
          <p className={`text-gray-600 dark:text-gray-300 ${
            deviceInfo.isFlipPhone ? 'text-sm' : 
            deviceInfo.isMobile ? 'text-base' : 
            deviceInfo.isTablet ? 'text-lg' : 
            deviceInfo.isTV ? 'text-2xl' : 
            'text-lg'
          }`}>
            Continuous professional development through certifications and skill building
          </p>
        </div>
        
        <div className={`relative w-full overflow-x-auto ${
          deviceInfo.isFlipPhone ? 'mb-4' : deviceInfo.isMobile ? 'mb-6' : 'mb-8'
        }`}>
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            className={`w-full mx-auto ${
              deviceInfo.isFlipPhone ? 'h-48' : 
              deviceInfo.isMobile ? 'h-64' : 
              deviceInfo.isTablet ? 'h-80' : 
              deviceInfo.isTV ? 'h-128' : 
              'h-96'
            }`}
            style={{ 
              minWidth: deviceInfo.isFlipPhone ? '280px' : 
                       deviceInfo.isMobile ? '350px' : 
                       deviceInfo.isTablet ? '500px' : 
                       '500px' 
            }}
          >
            {/* Clipping path to ensure content stays within chart area */}
            <defs>
              <clipPath id="chartClip">
                <rect 
                  x={marginLeft} 
                  y={marginTop} 
                  width={chartWidth - marginLeft - marginRight} 
                  height={chartHeight - marginTop - marginBottom}
                />
              </clipPath>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Grid Lines */}
            {[0, 5, 10, 15, 20, 22].map(value => {
              if (value > maxValue) return null
              const plotHeight = chartHeight - marginTop - marginBottom
              const y = marginTop + plotHeight - ((value / maxValue) * plotHeight)
              return (
                <g key={value}>
                  <line
                    x1={marginLeft}
                    y1={y}
                    x2={plotAreaRight}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-gray-200 dark:text-gray-600"
                    strokeDasharray="3,3"
                  />
                  <text
                    x={marginLeft - 10}
                    y={y + 5}
                    className="fill-gray-500 dark:fill-gray-400 font-medium"
                    textAnchor="end"
                    style={{ fontSize }}
                  >
                    {value}
                  </text>
                </g>
              )
            })}
            
            {/* X-axis */}
            <line
              x1={marginLeft}
              y1={plotAreaBottom}
              x2={plotAreaRight}
              y2={plotAreaBottom}
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300 dark:text-gray-600"
            />
            
            {/* Y-axis */}
            <line
              x1={marginLeft}
              y1={marginTop}
              x2={marginLeft}
              y2={plotAreaBottom}
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300 dark:text-gray-600"
            />
            
            {/* Chart content with clipping */}
            <g clipPath="url(#chartClip)">
              {/* Area under curve */}
              {animatedPoints.length > 0 && (
                <path
                  d={`${generatePath()} L ${getPointPosition(animatedPoints.length - 1, animatedPoints[animatedPoints.length - 1].cumulative).x} ${plotAreaBottom} L ${marginLeft} ${plotAreaBottom} Z`}
                  fill="url(#areaGradient)"
                  className="transition-all duration-1000 ease-out"
                />
              )}
              
              {/* Main line */}
              <path
                d={generatePath()}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
                }}
              />
            </g>
            
            {/* Data Points (outside clipping to show fully) */}
            {animatedPoints.map((point, index) => {
              const pos = getPointPosition(index, point.cumulative)
              return (
                <g key={point.year}>
                  {/* Glow effect */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="10"
                    fill="url(#lineGradient)"
                    className="opacity-30 animate-pulse"
                  />
                  {/* Main point */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={deviceInfo.isFlipPhone ? "4" : deviceInfo.isMobile ? "5" : deviceInfo.isTV ? "10" : "6"}
                    fill="url(#lineGradient)"
                    stroke="white"
                    strokeWidth={strokeWidth}
                    className="transition-all duration-300 hover:r-8 cursor-pointer"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2))'
                    }}
                  >
                    <title>{`${point.year}: ${point.cumulative} total certifications (+${point.certifications} new)`}</title>
                  </circle>
                  
                  {/* Year labels */}
                  <text
                    x={pos.x}
                    y={plotAreaBottom + (deviceInfo.isFlipPhone ? 20 : deviceInfo.isMobile ? 25 : 30)}
                    className="fill-gray-700 dark:fill-gray-300 font-semibold"
                    textAnchor="middle"
                    style={{ fontSize }}
                  >
                    {point.year}
                  </text>
                  
                  {/* Value labels */}
                  <text
                    x={pos.x}
                    y={pos.y - (deviceInfo.isFlipPhone ? 15 : deviceInfo.isMobile ? 18 : 20)}
                    className="fill-gray-900 dark:fill-white font-bold"
                    textAnchor="middle"
                    style={{ fontSize }}
                  >
                    {point.cumulative}
                  </text>
                </g>
              )
            })}
            
            {/* Y-axis label */}
            <text
              x={deviceInfo.isFlipPhone ? "15" : "25"}
              y={chartHeight / 2}
              className="fill-gray-700 dark:fill-gray-300 font-semibold"
              textAnchor="middle"
              transform={`rotate(-90, ${deviceInfo.isFlipPhone ? "15" : "25"}, ${chartHeight / 2})`}
              style={{ fontSize }}
            >
              Total Certifications
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className={`flex flex-wrap justify-center gap-4 ${
          deviceInfo.isFlipPhone ? 'mt-4 gap-2' : deviceInfo.isMobile ? 'mt-6 gap-3' : 'mt-8 gap-8'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg ${
              deviceInfo.isFlipPhone ? 'w-3 h-3' : deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'
            }`}></div>
            <span className={`text-gray-700 dark:text-gray-300 font-medium ${
              deviceInfo.isFlipPhone ? 'text-xs' : deviceInfo.isMobile ? 'text-sm' : deviceInfo.isTV ? 'text-xl' : 'text-base'
            }`}>Cumulative Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`bg-blue-500/30 rounded-full shadow-lg ${
              deviceInfo.isFlipPhone ? 'w-3 h-3' : deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'
            }`}></div>
            <span className={`text-gray-700 dark:text-gray-300 font-medium ${
              deviceInfo.isFlipPhone ? 'text-xs' : deviceInfo.isMobile ? 'text-sm' : deviceInfo.isTV ? 'text-xl' : 'text-base'
            }`}>Growth Area</span>
          </div>
        </div>
        
        <div className={`text-center ${
          deviceInfo.isFlipPhone ? 'mt-3' : deviceInfo.isMobile ? 'mt-4' : 'mt-6'
        }`}>
          <p className={`text-gray-500 dark:text-gray-400 ${
            deviceInfo.isFlipPhone ? 'text-xs' : deviceInfo.isMobile ? 'text-sm' : deviceInfo.isTV ? 'text-lg' : 'text-sm'
          }`}>
            Professional development journey from 2022 to 2025
          </p>
        </div>
      </div>
    </div>
  )
}

export default CertificationProgressChart

