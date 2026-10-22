import { ArrowRight, ImagePlus, IndianRupee, Layers3, Package, Type } from "lucide-react";

export default function ItemForm({ title, setTitle, description, setDescription, dailyRate, setDailyRate, deposit, setDeposit, categoryId, setCategoryId, categories, preview, handleImageChange, handleSubmit, loading, submitText }) {
  return (
    <div className="pr-listing-editor">
      <div className="pr-editor-intro"><div className="pr-editor-icon"><Package size={24} /></div><div><span className="pr-section-kicker">MAKE SOMETHING USEFUL</span><h2>Tell us about your item.</h2><p>A few details help the right person find it and give it a second life.</p></div></div>
      <form onSubmit={handleSubmit} className="pr-editor-form">
        <section className="pr-form-section"><div className="pr-form-section-heading"><span>01</span><div><h3>First impressions</h3><p>Give your listing a name and a great photo.</p></div></div>
          <div className="pr-field"><label htmlFor="item-title"><Type size={15} /> Item title</label><input id="item-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Canon EOS camera" required maxLength={100} /></div>
          <div className="pr-field"><label htmlFor="item-description">Description</label><textarea id="item-description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What makes this item useful? Share its condition, features, and anything renters should know…" required maxLength={2000} /></div>
          <div className="pr-field"><label htmlFor="item-image"><ImagePlus size={15} /> Item photo</label><div className="pr-upload-area">{preview ? <img src={preview} alt="Item preview" className="pr-upload-preview" /> : <div className="pr-upload-placeholder"><ImagePlus size={30} /><strong>Add a photo that tells the story</strong><span>JPG, PNG or WebP · up to 5 MB</span></div>}<input id="item-image" type="file" accept="image/*" onChange={handleImageChange} /></div></div>
        </section>
        <section className="pr-form-section"><div className="pr-form-section-heading"><span>02</span><div><h3>Rental details</h3><p>Set a fair price and help renters browse by category.</p></div></div>
          <div className="pr-form-two-col"><div className="pr-field"><label htmlFor="item-rate"><IndianRupee size={15} /> Daily rate</label><div className="pr-price-input"><span>₹</span><input id="item-rate" type="number" min="1" step="1" value={dailyRate} onChange={(event) => setDailyRate(event.target.value)} placeholder="500" required /></div><small>What you'll charge per day.</small></div><div className="pr-field"><label htmlFor="item-deposit"><IndianRupee size={15} /> Security deposit</label><div className="pr-price-input"><span>₹</span><input id="item-deposit" type="number" min="0" step="1" value={deposit} onChange={(event) => setDeposit(event.target.value)} placeholder="2000" required /></div><small>Refundable security amount.</small></div></div>
          <div className="pr-field"><label htmlFor="item-category"><Layers3 size={15} /> Category</label><select id="item-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} required><option value="">Choose the best fit</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.icon ? `${category.icon} ` : ""}{category.name}</option>)}</select></div>
        </section>
        <div className="pr-editor-submit-row"><p>Good listings have clear photos, honest details, and fair pricing.</p><button type="submit" disabled={loading} className="pr-auth-submit">{loading ? "Saving your listing…" : submitText}<ArrowRight size={18} /></button></div>
      </form>
    </div>
  );
}
