// Finds faces in every site image (Apple Vision, runs locally) and writes a focal point per image
// to src/data/focal.json so crops keep people's faces in frame. Re-run after adding photos:
//   swift scripts/faces.swift
import Foundation
import Vision
import ImageIO

let dirs = ["src/assets/img", "src/assets/people"]
var out: [String: [Double]] = [:]
let fm = FileManager.default
for dir in dirs {
  for name in (try? fm.contentsOfDirectory(atPath: dir))?.sorted() ?? [] {
    guard [".jpg", ".jpeg", ".png", ".webp"].contains(where: { name.lowercased().hasSuffix($0) }) else { continue }
    let url = URL(fileURLWithPath: "\(dir)/\(name)")
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { continue }
    let req = VNDetectFaceRectanglesRequest()
    try? VNImageRequestHandler(cgImage: img, options: [:]).perform([req])
    let faces = (req.results ?? []).filter { $0.confidence > 0.6 && $0.boundingBox.width > 0.02 }
    guard !faces.isEmpty else { continue }
    // Union of all face boxes (Vision uses a bottom-left origin; flip to top-left).
    let minX = faces.map { $0.boundingBox.minX }.min()!, maxX = faces.map { $0.boundingBox.maxX }.max()!
    let minY = faces.map { 1 - $0.boundingBox.maxY }.min()!, maxY = faces.map { 1 - $0.boundingBox.minY }.max()!
    let fx = (minX + maxX) / 2, fy = (minY + maxY) / 2
    out["/\(dir)/\(name)"] = [ (fx * 100).rounded(), (fy * 100).rounded(), Double(faces.count) ]
  }
}
let data = try JSONSerialization.data(withJSONObject: out, options: [.prettyPrinted, .sortedKeys])
try data.write(to: URL(fileURLWithPath: "src/data/focal.json"))
print("focal points: \(out.count) images with faces")
